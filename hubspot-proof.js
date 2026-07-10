#!/usr/bin/env node
/*
 * Pulls closed-won deals per competitor from HubSpot via the Gravitee MCP proxy
 * and writes hubspot-proofpoints.json, which index.html reads at page load.
 *
 * Build-time only. The gateway key stays in CI/your shell and never ships to the
 * browser. Run before deploy:  HUBSPOT_MCP_API_KEY=xxx node hubspot-proof.js
 * ponytail: static-JSON pipeline, no runtime key exposure, works on GitHub Pages.
 */
const fs = require('fs');

const URL_ = 'https://dev-org-gravitee-operations.eu-az-westeurope.gateway.gravitee.io/operations-hubspot-mcp-proxy';

// vendor id in index.html's V object  ->  HubSpot `competition` enum value.
// confluent/servicenow have no matching enum value, so they carry no proof points.
const MAP = {
  kong: 'Kong',
  salesforce: 'Mulesoft',
  microsoft: 'Msft Azure',
  google: 'Apigee',
  aws: 'Amazon AWS',
  solo: 'Solo.io',
  ibm: 'IBM',
  wso2: 'WS02',
};

// Pure shaping: HubSpot search response -> the per-vendor object the page renders.
function shape(data) {
  const results = data.results || [];
  const deals = results.map(r => {
    const p = r.properties || {};
    return {
      id: r.id || p.hs_object_id,
      name: p.dealname,
      amount: p.amount ? Number(p.amount) : null,
      currency: p.deal_currency_code || 'USD',
      reason: p.closed_won_reason || '',
      date: p.closedate || '',
    };
  });
  const total = deals.reduce((s, d) => s + (d.amount || 0), 0);
  return {
    count: data.total != null ? data.total : deals.length,
    total,
    currency: (deals[0] && deals[0].currency) || 'USD',
    deals: deals.slice(0, 8), // ponytail: top 8 by value; count reflects the true total
  };
}

if (process.argv.includes('--selftest')) {
  const s = shape({ total: 3, results: [
    { properties: { dealname: 'Acme', amount: '1000', deal_currency_code: 'EUR', closed_won_reason: 'x' } },
    { properties: { dealname: 'B', amount: '500' } },
  ] });
  console.assert(s.count === 3, 'count reflects total');
  console.assert(s.total === 1500, 'amounts summed');
  console.assert(s.currency === 'EUR', 'currency from first deal');
  console.assert(s.deals.length === 2, 'deals shaped');
  console.log('selftest ok');
  process.exit(0);
}

const KEY = process.env.HUBSPOT_MCP_API_KEY;
if (!KEY) { console.error('Set HUBSPOT_MCP_API_KEY (Gravitee gateway key for operations-hubspot-mcp-proxy)'); process.exit(1); }

async function call(name, args) {
  const res = await fetch(URL_, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-gravitee-api-key': KEY },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method: 'tools/call', params: { name, arguments: args } }),
  });
  const j = await res.json();
  if (j.error) throw new Error(j.error.message);
  const txt = j.result && j.result.content && j.result.content[0] && j.result.content[0].text;
  return txt ? JSON.parse(txt) : j.result;
}

// Clean customer name from a messy dealname as a fallback ("Blue Yonder-New Business-..." -> "Blue Yonder").
function fallbackCustomer(dealname) {
  return String(dealname || '').split('-')[0].trim() || dealname || 'Unnamed';
}

// Fetch the associated company (real customer) name for a deal. Degrades to '' on any error.
async function companyFor(dealId) {
  if (!dealId) return {};
  try {
    const data = await call('search_crm_objects', {
      objectType: 'companies',
      filterGroups: [{ associatedWith: [{ objectType: 'deals', operator: 'EQUAL', objectIdValues: [Number(dealId)] }] }],
      properties: ['name', 'domain', 'industry'],
      limit: 1,
    });
    const c = (data.results || [])[0];
    const p = c && c.properties || {};
    return { customer: p.name || '', domain: p.domain || '', industry: p.industry || '' };
  } catch (e) {
    return {};
  }
}

async function wins(compVal) {
  const data = await call('search_crm_objects', {
    objectType: 'deals',
    filterGroups: [{ filters: [
      { propertyName: 'hs_is_closed_won', operator: 'EQ', value: 'true' },
      { propertyName: 'competition', operator: 'EQ', value: compVal },
    ] }],
    properties: ['hs_object_id', 'dealname', 'amount', 'deal_currency_code', 'closed_won_reason', 'closedate', 'competition'],
    sorts: [{ propertyName: 'amount', direction: 'DESCENDING' }],
    limit: 100,
  });
  const s = shape(data);
  // Enrich only the kept (top-N) deals with their real customer/company name.
  for (const d of s.deals) {
    const c = await companyFor(d.id);
    d.customer = c.customer || fallbackCustomer(d.name);
    d.domain = c.domain || '';
    d.industry = c.industry || '';
  }
  return s;
}

(async () => {
  const out = {};
  for (const [id, comp] of Object.entries(MAP)) {
    try {
      const w = await wins(comp);
      if (w.count) out[id] = w;
      console.error(`${id} (${comp}): ${w.count} won`);
    } catch (e) {
      console.error(`${id} (${comp}): ${e.message}`);
    }
  }
  // Emit as a JS file (window.HS = ...) not JSON, so it loads via <script> and
  // works even when index.html is opened by double-click (file://), where fetch() is blocked.
  fs.writeFileSync('hubspot-proofpoints.js', 'window.HS = ' + JSON.stringify(out, null, 2) + ';\n');
  console.error('Wrote hubspot-proofpoints.js');
})();

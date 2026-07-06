/* Feature-level head-to-head data — sourced from gravitee.io/comparison pages */
const FC_LINKS={
  kong:'https://www.gravitee.io/comparison/gravitee-vs-kong',
  tyk:'https://www.gravitee.io/comparison/gravitee-vs-tyk',
  google:'https://www.gravitee.io/comparison/gravitee-vs-apigee',
  microsoft:'https://www.gravitee.io/comparison/gravitee-vs-azure',
  salesforce:'https://www.gravitee.io/comparison/gravitee-vs-mulesoft',
  aws:'https://www.gravitee.io/comparison/gravitee-vs-aws'
};
const FC={
kong:{
  intro:'Looking at Kong API Management alternatives? Check out how Kong API Management stacks up to the Gravitee event-native API Management platform.',
  highlights:['Unified API, event, agent management platform','Event-native, streaming-first API gateway','Multi-gateway, multi-broker governance'],
  sections:[
    {title:'API Gateway and API Management console',subtitle:'Support both your sync and async APIs',
     narrative:'Gravitee\u2019s API Management platform is built for event-driven use cases, handling both synchronous and asynchronous APIs with ease. While Kong does offer a relatively mature enterprise Gateway and API Management solution, Kong is limited when it comes to asynchronous API and streaming data use cases.',
     features:[
      {name:'Event-native API Management',desc:'The Gateway and Management console are built from the ground up to natively support event-driven API, asynchronous API, and streaming data use cases.',
       g:{s:'yes',n:'Gravitee is built from the ground up to support event-driven API and streaming data use cases. Reactive programming and extension capabilities independent of HTTP allow the Gateway to support any asynchronous API and/or protocol.'},
       r:{s:'no',n:'Kong is built on top of NGINX and OpenResty. NGINX is a pure, HTTP-based point-to-point proxy, which limits Kong\u2019s ability to support non-HTTP use cases including streaming data and protocols beyond HTTP.'}},
      {name:'REST/SOAP support',desc:'Can the API Gateway proxy and apply policies to REST API requests and responses.',
       g:{s:'yes',n:''},r:{s:'yes',n:''}},
      {name:'Kafka Support',desc:'The Gateway can proxy and apply policies to messages coming from a Kafka backend and/or Kafka client.',
       g:{s:'yes',n:''},
       r:{s:'partial',n:'Kong can technically proxy Kafka traffic but cannot apply policies or make Kafka services consumable via the Developer Portal.'}},
      {name:'Protocol Mediation',desc:'The Gateway can mediate between unlike protocols (e.g. HTTP and TCP).',
       g:{s:'yes',n:''},
       r:{s:'partial',n:'Kong offers limited support for client REST API over backend Kafka and gRPC use cases.'}}
     ]},
    {title:'API Access Management and API Security',subtitle:'Securing your APIs',
     narrative:'Gravitee offers a fully-featured Identity and Access Management solution for both application and API access control. Like Kong, Gravitee also comes with security-focused policies baked into the API Gateway.',
     features:[
      {name:'Native Identity and Access Management',desc:'Vendor offers native Identity and Access Management products and/or solutions.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Native multi-factor authentication',desc:'Native support to build, customize, and implement Multi-factor authentication (MFA).',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Step-up authentication',desc:'Requires users to produce additional forms of authentication when already authenticated with a first set of credentials.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Biometric authentication',desc:'Choose biometric authentication (fingerprint, facial recognition) as an MFA factor.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Bot Detection',desc:'Automatically detect and alert teams when potential bots are trying to access your APIs.',
       g:{s:'yes',n:''},r:{s:'no',n:''}}
     ]},
    {title:'Unified Developer Portal and Federation',subtitle:'Improved Developer Experience',
     narrative:'Gravitee provides a unified developer portal for a single view of all your APIs, across all your gateways, all your Events and all your Agentic AI agents.',
     features:[
      {name:'Developer portal for APIs, Events and Agents',desc:'A single view into all APIs, Events and Agents with a centralized hub to subscribe and govern them.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Federated APIs',desc:'Federate APIs from other gateways such as Azure, AWS, Apigee and more.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Create custom plans for API consumption',desc:'Build custom plans that API consumers can subscribe to (e.g. Free tier and Enterprise tier).',
       g:{s:'yes',n:''},r:{s:'yes',n:''}},
      {name:'Fully customizable and brandable',desc:'Let the developer portal reflect your brand while surfacing APIs, Events and Agents.',
       g:{s:'yes',n:''},r:{s:'yes',n:''}}
     ]},
    {title:'Event Gateway',subtitle:'The missing link between Kafka and productization',
     narrative:'Effortlessly expose Kafka natively to more consumers without changing application logic. Experience self-service discovery, documentation, granular access control, and rate limiting to tackle Kafka\u2019s biggest challenges in cost, security, and scalability.',
     features:[
      {name:'Natively Expose Kafka',desc:'Expose Kafka natively to Kafka clients without the need to change protocols.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Apply Policies to Kafka',desc:'Secure Kafka topics with granular access control, subscription approval workflows and authentication mediation; enforce rate limiting and message filtering.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Access Control',desc:'Apply granular access control on topics and data based on scopes, user identities, or other contextual information.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Virtual Topics',desc:'Map virtual topics with descriptive names to real back-end topics for a better developer experience.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Message Offloading',desc:'Reduce total Kafka costs and offload large messages to more cost efficient storage mechanisms.',
       g:{s:'yes',n:''},r:{s:'no',n:''}}
     ]},
    {title:'Agentic AI',subtitle:'Govern, secure and control your AI Agents',
     narrative:'Agentic AI systems are rapidly emerging as the new way to build applications. Gravitee\u2019s agent mesh brings sound governance to all your agents and LLMs, using the A2A and MCP protocols.',
     features:[
      {name:'Agent Gateway',desc:'A secure, scalable way to control Agent-to-Agent communications utilizing the A2A protocol with traffic management, usage quotas, routing and observability.',
       g:{s:'yes',n:''},
       r:{s:'partial',n:'Kong\u2019s AI Gateway is an LLM Gateway and does not offer the A2A support available in Gravitee\u2019s Gateway.'}},
      {name:'Agent Catalog',desc:'Centralized hub for discovering, managing, and scaling autonomous agents across your organization.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'MCP-enable all your APIs',desc:'Expose any API as an actionable tool through the Model Context Protocol (MCP) without rewriting backend code.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Agent-to-Agent (A2A) support',desc:'Standardizes how autonomous agents communicate and collaborate; Gravitee can A2A-enable frameworks that don\u2019t natively support A2A.',
       g:{s:'yes',n:''},r:{s:'no',n:''}},
      {name:'Explainable AI',desc:'Full traceability across agentic workflows — chain-of-thought visibility for debugging, auditing, and compliance.',
       g:{s:'yes',n:''},r:{s:'no',n:''}}
     ]}
  ],
  conclusion:'While Kong has firm brand recognition, they haven\u2019t focused on keeping their API Management and Gateway solutions up to date for modern use cases. Kong doesn\u2019t own their stack, and their Gateway\u2019s tech foundation is built on a pure HTTP, point-to-point-only solution which severely limits their support for asynchronous and event-driven APIs. Gravitee\u2019s enterprise Agentic API and Event Management platform is built with flexibility at the core, offering a platform that manages, secures, and governs synchronous and asynchronous APIs with one platform.'
}
};

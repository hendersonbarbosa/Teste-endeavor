export interface EndeavorCompany {
  name: string;
  vertical: string;
  subVertical: string;
}

const rows = `
180 Seguros|fintech|insurtech
Alura|education-talent|lifelong-learning
Asaas|fintech|accounting-financial-software
Beep Saúde|healthcare|healthcare-services
Blip|enterprise-software-services|business-services-consulting
Blipay|fintech|lending
Brex|fintech|banking
Brisanet|smart-city|telecoms
ClearSale|enterprise-software-services|security
CloudWalk|fintech|banking
Contabilizei|fintech|accounting-financial-software
Cora|fintech|banking
Creditas|fintech|lending
Descomplica|education-talent|higher-education
dr.consulta|healthcare|healthcare-services
Ebanx|fintech|payments
Flash|enterprise-software-services|human-resource-management
Hilab|healthcare|pharmaceuticals-diagnostics-life-sciences
Hotmart|retail-consumer-tech|media-platforms
iFood|food-beverage|marketplace-software
Ingresse|commerce|tourism-hospitality
Insider Store|commerce|apparel-accessories
Kovi|smart-city|mobility
Liv Up|food-beverage|alternative-models
Livemode|commerce|entertainment-content
Loft|retail-consumer-tech|real-estate
MadeiraMadeira|retail-consumer-tech|household-office
Mercado Bitcoin|fintech|blockchain-crypto
Movile|retail-consumer-tech|consumer-tech
Nelogica|fintech|wealth-management
Neon|fintech|banking
Nomad|fintech|banking
Nuvemshop|enterprise-software-services|ecommerce-retail-management
Olist|enterprise-software-services|ecommerce-retail-management
OneSkin|commerce|wellness-beauty
Pagaleve|fintech|lending
Pipefy|enterprise-software-services|business-process-management
Pismo|fintech|banking
Printi|enterprise-software-services|business-services-consulting
QI Tech|fintech|banking
RD Station|enterprise-software-services|marketing-automation
Rock Content|enterprise-software-services|adtech-martech
Solfácil|smart-city|energy
Swap|fintech|banking
TRACTIAN|smart-city|business-intelligence-tools
VivaReal|retail-consumer-tech|real-estate
VTEX|enterprise-software-services|ecommerce-retail-management
Zenvia|enterprise-software-services|cloud-communications
Zig|enterprise-software-services|payments
Zippi|fintech|lending
ABC da Construção|smart-city|constructech
Accera|enterprise-software-services|logistics-tech
Acqio|fintech|payments
Agilis|smart-city|clean-tech-infrastructure
Agrolend|food-beverage|financing
Akiyama|enterprise-software-services|business-intelligence-tools
Alice|healthcare|insurtech
AMARO|retail-consumer-tech|fashion-apparel
Ambar|smart-city|constructech
Angelus|healthcare|pharmaceuticals-diagnostics-life-sciences
Arizona|enterprise-software-services|adtech-martech
Arquivei|enterprise-software-services|business-process-management
Atmo Digital Media|enterprise-software-services|adtech-martech
Avantia|enterprise-software-services|security
B2|retail-consumer-tech|tourism-hospitality
Barte|fintech|payments
Beleza Natural|retail-consumer-tech|wellness-beauty
benCorp|healthcare|healthcare-services
Brasol|smart-city|energy
Casa do Construtor|smart-city|constructech
CERS|education-talent|workforce
Cobli|smart-city|mobility
Comunique-se|enterprise-software-services|cloud-communications
Confiance Medical|healthcare|wearables-devices-hardware
ContaAzul|fintech|accounting-financial-software
Cortex Intelligence|enterprise-software-services|business-intelligence-tools
Dermage|healthcare|salud-y-bienestar-del-consumidor
Desinchá Company|food-beverage|cpg
Dito|enterprise-software-services|customer-relationship-management
Doce d’ocê|food-beverage|cpg
Docket|enterprise-software-services|business-process-management
DryWash|retail-consumer-tech|consumer-tech
Escol@24Horas|education-talent|k-12
FortBrasil|fintech|lending
Geekie|education-talent|k-12
Geo Energetica|smart-city|energy
Gera|enterprise-software-services|business-process-management
Gesto|healthcare|insurtech
Gocase|retail-consumer-tech|fashion-apparel
Grupo Trigo|food-beverage|food-service
GuiaBolso|fintech|lending
Gupy|education-talent|talent-acquisition
I.Systems|smart-city|business-intelligence-tools
idwall|enterprise-software-services|security
Incognia|enterprise-software-services|security
Intelipost|smart-city|mobility
Involves|enterprise-software-services|ecommerce-retail-management
LAN Designers|enterprise-software-services|business-services-consulting
Magnamed|healthcare|wearables-devices-hardware
Mastermaq|enterprise-software-services|business-services-consulting
MaxMilhas|retail-consumer-tech|tourism-hospitality
Meliuz|fintech|payments
MoveEdu|education-talent|workforce
NeoAssist|enterprise-software-services|cloud-communications
Omie|fintech|accounting-financial-software
Pantys|retail-consumer-tech|fashion-apparel
Passei Direto|education-talent|higher-education
Pitzi|fintech|insurance
Pobre Juan|food-beverage|food-service
Porter Group (Kiper)|smart-city|constructech
Prática|smart-city|equipment-machinery
Proteus|smart-city|security
Quero|education-talent|higher-education
Rocket.Chat|enterprise-software-services|cloud-communications
Sallve|retail-consumer-tech|wellness-beauty
Selfit|retail-consumer-tech|wellness-beauty
Sempre Sementes|agriculture|produce-commodities
Sirtec|smart-city|energy
Solinftec|agriculture|agtech-data
Solubio|agriculture|agricultural-sciences
TECSAÚDE|healthcare|healthcare-services
TecVerde|smart-city|constructech
Tembici|smart-city|mobility
Tempest Security|enterprise-software-services|security
ToLife|healthcare|healthcare-services
Trocafone|retail-consumer-tech|consumer-tech
Uatt?|retail-consumer-tech|household-office
Unico|enterprise-software-services|cloud-infrastructure-it
Welle Laser|smart-city|hardware
Wellhub (fmr. GymPass)|marketplace|consumer-health-and-wellness
ZUP|enterprise-software-services|cloud-infrastructure-it
`.trim();

export const endeavorCompanies: EndeavorCompany[] = rows.split("\n").map((row) => {
  const [name = "", vertical = "", subVertical = ""] = row.split("|");
  return { name, vertical, subVertical };
});

export const verticalLabels: Record<string, string> = {
  agriculture: "Agricultura",
  commerce: "Comércio",
  "education-talent": "Educação e talentos",
  "enterprise-software-services": "Software e serviços empresariais",
  fintech: "Fintech",
  "food-beverage": "Alimentos e bebidas",
  healthcare: "Saúde",
  marketplace: "Marketplace",
  "retail-consumer-tech": "Varejo e tecnologia de consumo",
  "smart-city": "Cidades inteligentes",
};

export function formatTaxonomy(value: string): string {
  const labels: Record<string, string> = {
    "accounting-financial-software": "Contabilidade e software financeiro",
    "adtech-martech": "Publicidade e marketing digital",
    "agricultural-sciences": "Ciências agrícolas",
    "agtech-data": "Tecnologia e dados para agricultura",
    "apparel-accessories": "Roupas e acessórios",
    banking: "Serviços bancários",
    "blockchain-crypto": "Blockchain e criptoativos",
    "business-intelligence-tools": "Inteligência de negócios",
    "business-process-management": "Gestão de processos empresariais",
    "business-services-consulting": "Serviços e consultoria empresarial",
    "clean-tech-infrastructure": "Tecnologia limpa e infraestrutura",
    "cloud-communications": "Comunicação em nuvem",
    "cloud-infrastructure-it": "Infraestrutura em nuvem e TI",
    constructech: "Tecnologia para construção",
    "consumer-health-and-wellness": "Saúde e bem-estar do consumidor",
    "consumer-tech": "Tecnologia de consumo",
    cpg: "Bens de consumo",
    "customer-relationship-management": "Gestão de relacionamento com clientes",
    "ecommerce-retail-management": "Comércio eletrônico e gestão de varejo",
    energy: "Energia",
    "entertainment-content": "Entretenimento e conteúdo",
    "equipment-machinery": "Equipamentos e maquinário",
    "fashion-apparel": "Moda e vestuário",
    financing: "Financiamento",
    "food-service": "Serviços de alimentação",
    hardware: "Hardware",
    "healthcare-services": "Serviços de saúde",
    "higher-education": "Ensino superior",
    "household-office": "Casa e escritório",
    "human-resource-management": "Gestão de recursos humanos",
    insurance: "Seguros",
    insurtech: "Tecnologia para seguros",
    "k-12": "Educação básica",
    lending: "Crédito e empréstimos",
    "lifelong-learning": "Aprendizagem contínua",
    "logistics-tech": "Tecnologia para logística",
    "marketing-automation": "Automação de marketing",
    "marketplace-software": "Plataformas de marketplace",
    "media-platforms": "Plataformas de mídia",
    mobility: "Mobilidade",
    payments: "Pagamentos",
    "pharmaceuticals-diagnostics-life-sciences": "Farmácia, diagnóstico e ciências da vida",
    "produce-commodities": "Produção e commodities",
    "real-estate": "Mercado imobiliário",
    "salud-y-bienestar-del-consumidor": "Saúde e bem-estar do consumidor (ES)",
    security: "Segurança",
    "talent-acquisition": "Recrutamento e seleção",
    telecoms: "Telecomunicações",
    "tourism-hospitality": "Turismo e hospitalidade",
    "wealth-management": "Gestão de patrimônio",
    "wearables-devices-hardware": "Dispositivos vestíveis e hardware",
    "wellness-beauty": "Bem-estar e beleza",
    workforce: "Capacitação profissional",
    "alternative-models": "Modelos alternativos",
  };

  return labels[value] ?? value;
}

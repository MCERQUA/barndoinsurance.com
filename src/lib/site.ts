export const SITE = {
  name: "Barndo Insurance",
  domain: "barndoinsurance.com",
  url: "https://barndoinsurance.com",
  tagline: "Specialty Insurance for Barndominium Owners",
  description: "Specialty insurance for barndominiums — most standard carriers decline or misclassify them. We shop the markets that write barndo coverage right: dwelling, builders risk, shop coverage, farm and ranch. Licensed in all 50 states.",
  phone: "844-967-5247",
  phoneHref: "tel:+18449675247",
  phoneE164: "+18449675247",
  email: "josh@contractorschoiceagency.com",
  founded: 2005,
  npn: "8608479",
  address: {
    street: "12220 E Riggs Road, Suite #105",
    city: "Chandler",
    state: "AZ",
    zip: "85249",
    country: "US",
  },
  hours: "Mon–Fri 8am–5pm (MST)",
  statesLicensed: "All 50 states",
} as const;

export const SERVICES = [
  {
    slug: "barndominium-dwelling-insurance",
    title: "Barndominium Dwelling Insurance",
    short: "Replacement cost coverage for your completed barndo — the steel structure, attached shop, personal property, and liability.",
    icon: "Home",
    description:
      "Permanent property coverage for barndominiums used as primary or secondary residences. Specialty markets that understand steel-frame construction and mixed-use structures — not a standard HO3 that misclassifies your home.",
    longDescription: `## Barndominium Dwelling Insurance: Coverage Built for Barndo Owners

Barndominiums are not manufactured homes, not commercial buildings, and not standard stick-frame residences. They are steel-frame, metal-sided structures that combine residential living space with workshop, garage, or agricultural storage — and they require a policy form that actually fits.

Standard homeowners insurers (State Farm, Allstate, Farmers) routinely decline barndominiums or stuff them into policy forms that leave major coverage gaps. The five reasons: non-standard construction with no actuarial history, mixed-use classification confusion (residential plus workshop equals underwriting gray zone), rural location surcharges, hail concerns on metal roofs (often unfounded — metal outperforms shingles), and no comparable sales data for adjusters.

## Coverage A: Dwelling — The Building Itself

The most important coverage for a barndo owner is replacement cost on the steel structure. Replacement cost means you receive enough to rebuild to current construction costs — not depreciated actual cash value that shrinks every year regardless of how well you maintain the property.

A modern barndo with engineered steel framing, spray foam insulation, metal roofing, and quality interior finishes can cost $150–$300 per square foot to replace. On a 2,400 square foot barndo, that is $360,000–$720,000 in rebuild exposure. ACV with depreciation leaves a gap that makes rebuilding impossible.

We access specialty markets — farm/ranch carriers and surplus lines markets with experience on metal buildings — who write replacement cost on completed barndominiums correctly.

## Coverage B: Other Structures

Detached garages, equipment sheds, secondary barns, fencing, and other structures on the property are covered under Coverage B. For barndo owners on acreage with multiple outbuildings, this coverage limit matters — standard policies often set Coverage B at 10% of Coverage A, which is not enough for a large detached shop.

## Coverage C: Personal Property

Contents inside the living area — furniture, electronics, clothing, appliances — covered for replacement cost. For high-value items (firearms, collectibles, jewelry, musical instruments), scheduled items endorsements ensure proper coverage.

## Coverage D: Loss of Use

If a covered loss renders your barndo uninhabitable during repairs, Coverage D pays your temporary housing costs, meals, and additional living expenses. Given that barndo repairs — sourcing specialized steel components, working with certified metal building contractors — can take longer than standard construction, adequate loss of use limits matter.

## Coverage E: Liability

Third-party bodily injury or property damage occurring on your property. Rural barndo owners typically have more liability exposure than suburban homeowners: visitors, farm guests, delivery personnel, and large acreage increase the chance of an incident. Standard liability limits of $100,000 are often inadequate — we recommend $300,000 and a farm umbrella for larger properties.

## The Policy Form Question: HO3 vs. Farm/Ranch vs. Dwelling Fire

This is where most barndo owners get hurt. An HO3 (standard homeowners) form was written for stick-frame residential properties. It often cannot accommodate a barndo's mixed-use nature, rural location, or steel construction without exclusions that gut the coverage.

Farm and ranch package policies frequently provide a better fit — they're written for rural properties with mixed residential and agricultural use, include outbuildings naturally, and come from carriers with experience valuing steel structures. For barndo owners with livestock or crop storage, this is almost always the right form.

Dwelling fire (DP3) forms are a fallback for properties that don't fit either category. They provide open-peril property coverage without the liability and personal property components of a homeowners form — useful when stacking separate coverages.

We navigate this form selection for every barndo client. Getting the form right is as important as the coverage limits.`,
    coverages: [
      "Replacement cost on steel structure (no ACV depreciation)",
      "Open-peril property coverage (all risks minus exclusions)",
      "Other structures: detached garage, shop, outbuildings",
      "Personal property with scheduled items available",
      "Loss of use / additional living expenses",
      "Liability: $100K–$500K limits available",
      "Farm/ranch policy form available for mixed-use barndos",
      "Extended replacement cost endorsement available",
    ],
    faqs: [
      {
        q: "Why is barndominium insurance so hard to get?",
        a: "Standard carriers struggle with five things: non-standard steel construction (no actuarial history), mixed residential and workshop use (underwriting classification confusion), rural location (longer fire response times increase rated risk), hail concerns on metal roofs (often overstated — metal performs well), and no comparable sales data for appraising barndo value. Specialty markets have priced these risks correctly — standard carriers largely haven't.",
      },
      {
        q: "Is barndominium insurance more expensive than regular homeowners?",
        a: "It can be slightly higher due to rural location factors and specialty market placement, but not dramatically so when placed correctly. The bigger risk is being placed in a wrong form that leaves coverage gaps — paying for insurance that won't pay a claim is more expensive than paying the right premium.",
      },
      {
        q: "What is the average cost of barndominium insurance?",
        a: "A properly placed barndo policy typically runs $1,000–$2,500 per year for a primary dwelling with replacement cost coverage on a $300,000–$600,000 structure. Factors: square footage, location and fire protection class, shop or agricultural use on site, claims history, and security measures.",
      },
      {
        q: "Does State Farm or Allstate insure barndominiums?",
        a: "Some State Farm agents write barndominiums in certain states; most standard carriers do not have a consistent appetite. Coverage varies by agent, state, and underwriting review. The issue is that even when placed, standard carriers often misclassify the structure or use restrictive policy forms. Specialty markets are the more reliable path.",
      },
      {
        q: "What is the difference between actual cash value and replacement cost for a barndo?",
        a: "Actual cash value (ACV) depreciates the structure based on age and condition. A 15-year-old barndo might receive 50% of its replacement cost after depreciation. Replacement cost pays what it actually costs to rebuild today — no depreciation deduction. For a steel building, the difference can be $100,000–$300,000 on a serious loss.",
      },
      {
        q: "Is a barndominium considered a manufactured home for insurance?",
        a: "No. Manufactured homes (mobile homes) are built in factories and transported to the site. Barndominiums are site-built steel-frame structures — they are site-built residential properties, not manufactured housing. This classification matters significantly for both coverage form and rate.",
      },
      {
        q: "Can I insure my barndo under a standard HO3 homeowners policy?",
        a: "Some carriers will write an HO3 on a barndo, but it often isn't the best fit. HO3 forms were written for stick-frame residential properties and may have exclusions or valuation issues specific to steel-frame mixed-use structures. Farm/ranch policies and specialty dwelling forms often provide better coverage.",
      },
      {
        q: "What if I live on the property but also run a small farm?",
        a: "This is exactly the scenario where a farm/ranch package policy excels over a homeowners policy. Farm/ranch forms accommodate residential dwelling coverage plus farm structures, livestock, farm equipment, and farm liability in a single policy — designed for mixed-use rural properties.",
      },
      {
        q: "Does liability coverage protect me if someone is injured on my acreage?",
        a: "Yes — personal liability (Coverage E) covers third-party bodily injury and property damage on your property. However, if you have farm operations, paying guests, or commercial activity, you need farm liability or business GL in addition to the standard residential liability limit.",
      },
      {
        q: "Does barndo insurance cover the metal roof?",
        a: "Yes — the metal roof is part of the dwelling structure and covered under Coverage A. Metal roofs are actually an underwriting advantage in some markets: they outperform asphalt shingles in wind and hail events. Some carriers offer premium discounts for metal roofing.",
      },
      {
        q: "Does the policy cover attached garages or workshops?",
        a: "An attached garage or workshop that shares a wall with the living area is generally covered under Coverage A as part of the dwelling. A detached structure is Coverage B (other structures). For a large attached shop that is structurally integral to the barndo design, confirm with your carrier that full replacement cost applies to the entire structure.",
      },
      {
        q: "What happens if my barndo is damaged by a tornado?",
        a: "A tornado is a covered peril under both windstorm/hail and open-peril policy forms. The policy pays replacement cost to rebuild the structure. The key issue for barndo owners: adequate Coverage A limits to cover the actual cost of rebuilding a steel-frame structure, and extended replacement cost endorsements that protect against construction cost increases between the time the policy was written and the time of a loss.",
      },
      {
        q: "Is barndominium insurance required by my mortgage lender?",
        a: "Yes. Any lender with a mortgage on the property will require property insurance with coverage at least equal to the loan balance, naming them as loss payee. For a barndo, getting lender-required coverage from a specialty market that correctly classifies the structure is important — a declined standard policy leaves you unable to close or maintain the loan.",
      },
      {
        q: "Can I insure a barndominium on raw land with no mortgage?",
        a: "Yes. You are not required to have a mortgage to purchase property insurance. Many barndo owners on paid-off rural land still carry dwelling coverage for protection against loss. Flood insurance, however, is never required without a federally-backed mortgage — but we still recommend it for barndo owners in flood-prone areas.",
      },
      {
        q: "How do I document my barndo's value for insurance?",
        a: "Start with your construction receipts: steel kit invoice, foundation cost, mechanical/electrical subcontracts, and interior finish costs. A certified insurance appraisal from a firm experienced with steel buildings gives you the most defensible agreed value. We can guide you through the valuation process.",
      },
      {
        q: "How long does it take to get a barndo insurance quote?",
        a: "Same-day quotes in most cases. We need: your address, approximate square footage, year built, construction type (post-frame/steel frame/metal siding), how the structure is used, and your estimated rebuild value. We'll shop specialty markets and return options quickly.",
      },
      {
        q: "Is barndo insurance available in all 50 states?",
        a: "Yes — CCA is licensed in all 50 states. Barndo insurance availability varies by state, but we have access to specialty markets and surplus lines carriers that write barndominiums across the country. States with the most active barndo markets (Texas, Oklahoma, Tennessee, Alabama, Florida, Missouri) have the broadest carrier options.",
      },
      {
        q: "Does flooding or water damage count for barndominium insurance?",
        a: "Standard property policies exclude flood — water that enters from the ground or an overflow event. Storm-driven rain through a roof opening is typically covered. Plumbing leaks inside the structure are generally covered. Ground flooding, river overflow, or storm surge are excluded and require a separate flood policy (NFIP or private flood).",
      },
      {
        q: "What carriers write barndominium insurance?",
        a: "We access specialty markets including farm/ranch carriers (Pekin Insurance, Grinnell Mutual, Acuity, Rural Mutual), specialty dwelling markets, and admitted and surplus lines carriers with barndo experience. The right market depends on your state, how the property is used, and whether you have agricultural operations.",
      },
      {
        q: "Can I get barndo insurance if I have no prior claims history?",
        a: "Yes. No prior claims history is actually favorable in underwriting. Carriers look at the property itself — construction type, location, fire protection class, age — more than prior insurance history for new barndo policies.",
      },
      {
        q: "Does my policy cover damage to the metal walls or siding specifically?",
        a: "Yes — the metal siding is part of the dwelling structure (Coverage A). Damage from hail, wind, vehicle collision, fire, or vandalism is covered. Wear and corrosion over time (normal deterioration) is excluded from all property policies.",
      },
      {
        q: "What if I want to run a small business from my barndo's shop space?",
        a: "Standard residential policies exclude business pursuits. If you have customers coming to the shop, perform services commercially, or store business inventory, you need a business liability endorsement or a separate commercial policy for those operations. The farm/ranch policy often handles small agricultural businesses, but commercial service businesses require commercial coverage.",
      },
    ],
  },
  {
    slug: "barndominium-builders-risk-insurance",
    title: "Builders Risk Insurance",
    short: "Coverage for your barndo during construction — materials, partially completed structure, and weather damage from day one.",
    icon: "HardHat",
    description:
      "Builders risk insurance covers your barndominium during the construction phase — from first material delivery to occupancy. Don't start your barndo build without it.",
    longDescription: `## Barndominium Builders Risk Insurance

A barndominium under construction is your biggest unprotected financial exposure. Your steel kit arrives — $40,000–$120,000 in material sitting on a rural site before a single bolt is set. A thunderstorm hits. Someone steals copper wire. A framing accident damages the partially erected frame. None of this is covered by your standard auto, homeowners, or farm policy.

Builders risk insurance is the correct coverage for the construction phase. It covers the building as it's being built, materials on-site, and materials in transit to the site.

## What Builders Risk Covers

- The partially completed steel structure during construction
- Building materials stored on the job site (steel kit panels, lumber for interior, insulation, fixtures)
- Materials in transit from supplier to the job site
- Temporary structures (scaffolding, form work, temporary enclosures)
- Fire, theft, vandalism, wind and storm damage, lightning
- Collapse of the partially completed structure

## Barndo-Specific Construction Risks

Metal building kits present unique builders risk exposures that most residential contractors don't face:

**Material delivery risk:** A steel building kit arrives on flatbed trucks — $60,000–$100,000 in panels, columns, and hardware. These materials may sit on-site for weeks before erection begins. Standard homeowners policies don't cover materials on a construction site that isn't yet your residence.

**Theft of metals:** Copper wire, aluminum components, and steel scrap have high resale value. Rural construction sites — often unmanned overnight and on weekends — are theft targets. The barndo's own structural materials can be targets before the site is secure.

**Frame erection exposure:** The erection phase (setting columns, attaching purlins, girts, and panels) is when the most value is at risk from a weather event. A partially erected steel frame is significantly more vulnerable to wind than a completed, braced building.

## What Builders Risk Does NOT Cover

- General liability (you need separate GL if you're acting as your own GC and have workers or subcontractors on site)
- Your tools and equipment (inland marine covers these)
- Employee theft
- Faulty workmanship (resulting damage is covered, the defective work itself is not)
- Flood (separate policy needed even during construction)

## The Construction-to-Dwelling Transition

This is where working with a single broker for both phases pays off. Builders risk terminates — typically when you take occupancy of the completed barndo. If there's a gap between builders risk expiration and your permanent dwelling policy inception, you have an uncovered window.

CCA quotes both policies simultaneously. We know the construction schedule, we know when occupancy is likely, and we transition you from builders risk to a permanent barndo dwelling policy without gaps.`,
    coverages: [
      "Completed and in-progress structure coverage",
      "Materials on-site and in transit",
      "Theft of building materials",
      "Wind, fire, and storm during construction",
      "Temporary structures and scaffolding",
      "Soft costs option (permit fees, architect costs)",
      "Seamless transition to permanent dwelling policy",
    ],
    faqs: [
      {
        q: "Do I need builders risk insurance to build a barndominium?",
        a: "Lenders require builders risk if you have a construction loan. Even if you're self-financing, builders risk is essential — the period between first material delivery and completion is when your investment is most exposed and standard policies provide no coverage.",
      },
      {
        q: "When does builders risk coverage start?",
        a: "Coverage typically begins when the first materials are delivered to the job site — before the first post goes in. Make sure your policy is in force before your steel kit is delivered.",
      },
      {
        q: "Can I get builders risk if I'm acting as my own general contractor?",
        a: "Yes. Owner-builder builders risk policies are available. Note that if you hire subcontractors, you should also carry a site liability policy — builders risk covers the property, not bodily injury to workers on site.",
      },
      {
        q: "What if the frame is damaged in a storm before it's fully enclosed?",
        a: "This is a covered loss under builders risk — wind and storm damage to the partially completed structure is exactly what builders risk is designed for. Document the damage with photos immediately and contact us to file a claim.",
      },
      {
        q: "Is theft of my barndo's steel materials covered?",
        a: "Yes. Theft of materials from the construction site is a covered peril. Rural construction sites are particularly vulnerable — maintain a material inventory and document deliveries with photos and invoices to support a claim.",
      },
      {
        q: "How long does a builders risk policy last?",
        a: "Builders risk policies are typically written for 6–12 months with options to extend. For larger barndo projects that run long, we can extend the policy or rewrite for a new term. The policy terminates at completion and occupancy.",
      },
      {
        q: "How much does barndominium builders risk insurance cost?",
        a: "Builders risk premiums typically run 1–4% of the completed project value annually. For a $300,000 barndo build, that's $3,000–$12,000 for the policy term (pro-rated to construction duration). Cost factors: project value, construction timeline, location, security measures.",
      },
    ],
  },
  {
    slug: "barndominium-shop-coverage",
    title: "Shop & Workshop Coverage",
    short: "Many barndo policies leave the shop section uncovered. Specialty coverage for your garage, workshop, and workspace.",
    icon: "Wrench",
    description:
      "Barndominiums with attached shops, welding bays, auto repair areas, or woodworking spaces have coverage needs standard homeowners policies can't meet. We navigate the business-use exclusion and place coverage that actually protects your workspace.",
    longDescription: `## Barndominium Shop & Workshop Insurance

The mixed-use nature of a barndominium — residential living space plus functional shop or workspace — creates coverage complexity that trips up standard homeowners policies. A standard HO3 policy was written for residential use only. When your barndo includes a welding shop, a woodworking studio, an auto repair bay, or any space where you work with power tools or clients, you're into territory where standard residential coverage has explicit exclusions.

## The Business Pursuits Exclusion

Standard homeowners policies contain a "business pursuits" exclusion that removes coverage for losses arising from business activities conducted on the premises. If you weld in your shop for income, repair cars for customers, or sell woodworking products — even part-time — the exclusion can apply to eliminate coverage on the shop section entirely.

This exclusion doesn't require a major commercial operation. A weekend side business that generates $5,000 a year can trigger it.

## What Counts as a Shop for Coverage Purposes

Coverage needs depend on how the space is used:

**Hobby shop (no income, no customers):** Tools and personal property are covered under homeowners personal property limits. However, standard policies often cap power tools and machinery at low sublimits. Scheduling high-value tools (welders, CNC machines, mills, plasma cutters) as scheduled personal property ensures full coverage.

**Home-based business (income generating):** Standard homeowners doesn't adequately cover it. An in-home business endorsement increases personal property limits for business equipment and adds limited business liability — appropriate for light commercial activity with no customer visits.

**Customer-facing shop (clients on site):** If customers come to your property for service, standard residential liability doesn't cover injuries to those customers. Commercial general liability (GL) is required for customer-facing operations.

## Tools and Equipment: The High-Value Problem

Standard homeowners personal property coverage often caps power tools, machinery, and business equipment at $2,500–$5,000 sublimits. A single CNC router can cost $15,000. A commercial welder runs $3,000–$8,000. A car lift for an auto bay costs $4,000+.

Scheduled personal property (listing each item with its value) ensures your tools are covered for their full replacement cost. For very high-value equipment, inland marine provides the broadest coverage.

## The Farm/Ranch Policy Solution

For barndo owners with agricultural context — rural acreage, livestock, crop storage, farm equipment — a farm/ranch package policy is often the cleanest solution. These policies:

- Cover the residential dwelling (the barndo's living quarters)
- Cover farm structures including the shop as an outbuilding
- Include farm machinery and equipment as a separate coverage
- Allow for small agricultural or rural business activity without triggering residential business exclusions
- Provide farm liability that accommodates rural property use

A farm/ranch policy eliminates the residential form mismatch for mixed-use barndo properties.`,
    coverages: [
      "Scheduled personal property for high-value tools",
      "In-home business endorsement for light commercial use",
      "Business GL for customer-facing shop operations",
      "Inland marine for high-value equipment",
      "Farm/ranch policy for agricultural barndo properties",
      "Contents coverage without residential sublimit caps",
    ],
    faqs: [
      {
        q: "Does my barndo's homeowners insurance cover my workshop tools?",
        a: "Personal property coverage applies, but standard policies cap power tools and business equipment at low sublimits — often $2,500–$5,000. Scheduling high-value tools individually or adding an inland marine policy ensures full replacement cost coverage.",
      },
      {
        q: "What if I use my shop for occasional income but not full-time business?",
        a: "Even occasional income-generating activity can trigger the business pursuits exclusion in a standard homeowners policy. An in-home business endorsement covers light commercial activity with no customer visits. If customers come to your property, commercial GL is the next step.",
      },
      {
        q: "Does my barndo policy cover an auto repair bay inside the shop?",
        a: "If customers bring vehicles to you for repair, you need commercial GL. Customer vehicles in your care, custody, and control create garage liability exposure that residential policies explicitly exclude. A standalone garage liability policy may be needed for vehicle service operations.",
      },
      {
        q: "Can a farm/ranch policy cover my barndo and shop together?",
        a: "Yes, and for rural barndo owners, it often provides the best fit. Farm/ranch policies accommodate mixed-use properties naturally — residential dwelling, agricultural structures, equipment, and rural business activity in one policy form.",
      },
    ],
  },
  {
    slug: "farm-ranch-barndominium-insurance",
    title: "Farm & Ranch Barndo Insurance",
    short: "When your barndo is on working land: farm/ranch package policies covering dwelling, livestock, equipment, and farm liability.",
    icon: "Tractor",
    description:
      "Barndominiums on working farms or ranches need more than a homeowners policy. Farm and ranch package insurance covers your barndo, livestock, outbuildings, and ag equipment together with the right policy form for rural operations.",
    longDescription: `## Farm & Ranch Barndominium Insurance

If your barndominium sits on working agricultural land — with livestock, crop storage, farm equipment, or income-generating farm activity — a standard homeowners policy is the wrong tool. Farm and ranch package policies were built for exactly this scenario: a rural residence integrated with working land and agricultural operations.

## When You Need Farm/Ranch Coverage

The trigger isn't a minimum acreage or livestock count. The trigger is agricultural activity:

- Any livestock on the property (cattle, horses, goats, pigs, poultry, llamas)
- Stored crops, grain, hay, or silage
- Farm equipment (tractors, implements, ATVs, farm trucks)
- Agricultural income from the property (selling livestock, crop income, boarding horses)
- Outbuildings used for agricultural purposes (equipment sheds, barns, grain bins)

If any of these apply, a farm/ranch policy is almost certainly the better fit — and often provides significantly more coverage at comparable or lower cost than a homeowners policy with multiple endorsements.

## What a Farm/Ranch Package Includes

**Farmowners dwelling:** Your barndo's living quarters covered for replacement cost on the steel structure, same as a dwelling policy. Some farm/ranch carriers have more experience valuing steel-frame structures than standard homeowners carriers.

**Farm structures:** Outbuildings, barns, equipment sheds, grain bins, pens, and fencing are covered as farm structures — not as "other structures" capped at 10% of dwelling value. Meaningful coverage for barndo owners with substantial outbuildings.

**Farm personal property:** Stored crops, livestock feed, fertilizer, chemicals, supplies. The items in your barn and outbuildings that a homeowners policy doesn't consider at all.

**Farm equipment:** Tractors, planters, harrows, wagons, ATVs used for farm work, and farm trailers. Scheduled or on a blanket value. Auto coverage for farm trucks varies by how they're used — on-road farm trucks typically need a commercial auto endorsement.

**Farm liability:** Third-party injury or property damage arising from farming operations. Critical differences from residential liability: livestock escape (your animals on a neighbor's property causing damage), farm product liability (direct sales of milk, eggs, produce), farm visitor injury, custom operator liability. Standard residential liability is not adequate for these exposures.

## Livestock Coverage

Farm/ranch policies include options for livestock coverage beyond basic mortality. Named-peril livestock coverage (fire, lightning, drowning, windstorm, accidental shooting, attack by dogs) is typically included. Blanket herd coverage or individually scheduled valuable animals (breeding bulls, stallions, registered cattle) provides higher limits.

Foreign object ingestion — wire and metal fragments from harvested forage destroying a cow's digestive system — is a significant and often-overlooked exposure on farms with harvested silage or hay. Specialty programs cover this; standard named-peril livestock does not always include it.

## Agritourism Exposure

Agritourism is growing: farm stays, U-pick operations, petting farms, farm tours, on-farm events. Standard farm/ranch policies may not cover commercial visitor activity. If you have paying guests on your property for any reason, an agritourism endorsement or separate commercial policy may be needed.`,
    coverages: [
      "Dwelling (barndo) on replacement cost",
      "Farm structures: barns, sheds, bins, fencing",
      "Livestock mortality (named perils)",
      "Farm equipment and machinery",
      "Stored crops and farm personal property",
      "Farm liability including livestock escape",
      "Agritourism endorsement available",
      "Farm umbrella for larger operations",
    ],
    faqs: [
      {
        q: "Do I need a farm/ranch policy or can I use a homeowners policy for my barndo?",
        a: "If you have any livestock, farm equipment, stored crops, or agricultural income, a farm/ranch policy is the better fit. Homeowners policies exclude farm operations, don't cover farm equipment, and cap outbuilding coverage in ways that leave significant gaps for rural barndo owners.",
      },
      {
        q: "What acreage triggers a farm/ranch policy?",
        a: "Acreage alone isn't the trigger — agricultural activity is. A 5-acre hobby farm with goats and chickens needs farm/ranch coverage. A 50-acre property with no farm activity might be fine on a dwelling policy. What matters is whether there is livestock, equipment, or income-generating ag activity.",
      },
      {
        q: "Does a farm/ranch policy cover my horses?",
        a: "Yes — horses are livestock and can be covered on a farm/ranch policy for mortality from named perils. High-value breeding stock or performance horses may warrant individual scheduling for higher limits. Farm/ranch liability covers equine liability exposures that standard homeowners liability excludes.",
      },
      {
        q: "Is my farm truck covered under the farm/ranch policy?",
        a: "Farm trucks used exclusively on the farm (not on public roads) are typically covered under farm personal property or equipment. Farm trucks that drive on public roads need commercial auto coverage. The specific use determines the form.",
      },
    ],
  },
  {
    slug: "barndominium-flood-insurance",
    title: "Flood Insurance",
    short: "Standard barndo policies never include flood. Rural barndominiums are often on or near flood-prone land — NFIP and private flood options.",
    icon: "Droplets",
    description:
      "Standard barndominium insurance excludes flood by definition. Rural properties on acreage — near creeks, rivers, and low-lying agricultural land — face real flood exposure. NFIP and private flood options for barndo owners.",
    longDescription: `## Barndominium Flood Insurance

Flood is excluded from every standard property insurance policy — including barndominium policies, farm/ranch policies, and dwelling fire policies. This is not a fine-print technicality; it is explicit and universal. If water enters your barndo from the ground, from an overflowing creek or river, or from storm surge, your property policy pays nothing.

For rural barndo owners, flood exposure is real. Rural parcels in Texas, Oklahoma, Tennessee, Alabama, and other high-barndo states are frequently on or near waterways. Low-lying agricultural land, river bottom pastures, and creek-adjacent properties are common barndo sites — and they carry genuine flood risk.

## FEMA NFIP Flood Insurance

The National Flood Insurance Program (NFIP) is the primary flood insurance option for most American homeowners. Available through licensed agents (CCA is a licensed NFIP agent), NFIP provides:

- Up to $250,000 in building (structure) coverage
- Up to $100,000 in contents coverage
- Available in participating NFIP communities (most incorporated areas and many rural counties)
- Mandatory if your property is in a Special Flood Hazard Area (SFHA/Zone A or V) with a federally-backed mortgage

Important NFIP limitations: 30-day waiting period before coverage takes effect (except at loan closing), no coverage for additional living expenses during repairs, limited to $250K/$100K maximum, and claims experience with FEMA can be slower than private carriers.

## Private Flood Insurance

Private flood carriers have grown significantly since 2012 and now offer strong alternatives or supplements to NFIP:

- Higher limits than NFIP ($250K is insufficient for many barndominiums)
- No 30-day waiting period (typically 14 days or available immediately at loan closing)
- Additional living expenses coverage — critical given extended barndo repair timelines
- Replacement cost on contents (NFIP pays ACV for contents)
- Often comparable or lower premiums than NFIP for properties not in SFHA

For barndo owners with structure values over $250,000, private flood is often the better solution — either as the primary policy or as excess flood above the NFIP limit.

## Barndo-Specific Flood Considerations

Metal buildings and flood interact differently than stick-frame residential structures:

**Slab foundations and flood:** Barndominiums are commonly built on concrete slabs. Slab-on-grade construction has no elevated floor; water enters immediately at grade level. Elevated foundations (piers, crawl spaces) provide buffer. Slab barndo owners in flood-prone areas face more exposure per flood event than pier-and-beam homes.

**Steel wall panel and water intrusion:** Floodwater in steel wall cavities can accelerate corrosion if not properly dried and treated. Remediation costs for a barndo include the same water extraction and drying process as any residence, plus attention to condensation and rust prevention in the structural steel.

**Extended repair timelines:** Barndo contractors who work with steel buildings are not as abundant as residential contractors in every market. If a flood requires structural steel repair, sourcing qualified contractors and replacement steel can extend the restoration period. Adequate living expense coverage in a private flood policy matters.

## Checking Your Flood Zone

FEMA's Flood Map Service Center (msc.fema.gov) allows you to check your property's flood zone using your address. Key zones:

- **Zone X (unshaded):** Minimal flood hazard, outside the 500-year floodplain
- **Zone X (shaded):** Moderate flood hazard, between 100-year and 500-year floodplain
- **Zone AE:** High hazard, within 100-year floodplain with established base flood elevations
- **Zone A:** High hazard, within 100-year floodplain without established elevations
- **Zone VE:** Coastal high hazard with wave action

An elevation certificate, prepared by a licensed surveyor, establishes your structure's elevation relative to the base flood elevation. This document significantly affects flood insurance premium — and is worth obtaining for any barndo in a flood zone.`,
    coverages: [
      "NFIP flood insurance (up to $250K structure, $100K contents)",
      "Private flood insurance (higher limits, no 30-day wait)",
      "Excess flood above NFIP for high-value barndos",
      "Building coverage on replacement cost basis",
      "Contents coverage",
      "Additional living expenses (private flood)",
      "Elevation certificate guidance",
    ],
    faqs: [
      {
        q: "Is flood insurance required for a barndominium?",
        a: "NFIP flood insurance is federally required if your property is in a Special Flood Hazard Area (Zone A or V) with a federally-backed mortgage (FHA, VA, USDA, Fannie, Freddie). Outside flood zones or with conventional financing, it is not legally required — but strongly recommended for rural properties near waterways.",
      },
      {
        q: "How much does barndominium flood insurance cost?",
        a: "NFIP premiums vary widely by flood zone, structure elevation, and building characteristics. Zone X (low hazard) policies can run $500–$800 per year. Zone AE (high hazard) policies with maximum coverage can run $2,000–$5,000+. Private flood is often competitive for lower-risk properties and offers better value for higher limits.",
      },
      {
        q: "My barndo is not in a flood zone — do I still need flood insurance?",
        a: "25% of all NFIP flood claims come from outside high-risk flood zones. Rural properties can flood from localized heavy rainfall, overwhelmed drainage, and small creek rises that don't map as flood zones. A flood policy outside an SFHA is inexpensive and protects against the unexpected.",
      },
      {
        q: "Will the NFIP cover my barndominium's shop section?",
        a: "The NFIP building coverage applies to the structure as a whole, including an attached shop. Detached structures require separate NFIP policies (one NFIP policy per structure). Contents in the shop are covered under contents coverage up to $100K.",
      },
    ],
  },
] as const;

export const STATS = [
  { value: 20, suffix: "+", label: "Years Specialty Insurance" },
  { value: 50, suffix: " States", label: "Licensed Nationwide" },
  { value: 1000, suffix: "+", label: "Barndos Insured" },
  { value: 24, suffix: " Hours", label: "Quote Turnaround" },
] as const;

export const TESTIMONIALS: readonly { quote: string; name: string; role: string; location: string }[] = [];

export const FAQS = [
  {
    q: "Why won't standard insurance companies cover my barndominium?",
    a: "Standard carriers struggle with five things: non-standard steel construction (no actuarial history), mixed residential and workshop use (underwriting gray zone), rural location (longer fire response times), hail concerns on metal roofs (often overstated), and no comparable property data for valuing barndos. Specialty markets — farm/ranch carriers, surplus lines, specialty dwelling programs — have priced these risks correctly and write barndominiums every day.",
  },
  {
    q: "What type of insurance does a barndominium need?",
    a: "A completed barndo needs: (1) Dwelling/property insurance for the structure and contents — replacement cost, correct policy form; (2) Liability coverage; (3) Flood insurance separately (always excluded from property policies). If you have farm operations, a farm/ranch package replaces the standard homeowners form. If you're still building, builders risk coverage during construction.",
  },
  {
    q: "How much does barndominium insurance cost?",
    a: "A properly placed barndo dwelling policy runs $1,000–$2,500 per year for most primary residences. Factors: structure size, replacement cost value, location and fire protection class, any shop or agricultural use, claims history, and coverage limits. Builders risk during construction runs additional cost based on project value.",
  },
  {
    q: "Is barndominium insurance available in Texas, Oklahoma, and Tennessee?",
    a: "Yes. Texas, Oklahoma, and Tennessee are among the most active barndo markets in the country. We write barndo policies in all 50 states and have placed barndo coverage across the top barndo states. State-specific carrier options vary — contact us for availability in your state.",
  },
  {
    q: "What is the difference between a barndominium and a pole barn home?",
    a: "These terms are often used interchangeably. A pole barn (post-frame) home uses large dimensional lumber poles as the primary structure; a barndominium often uses steel framing with metal siding. Both are non-standard construction for insurance purposes and require specialty market placement. Coverage needs and carrier options are similar.",
  },
  {
    q: "Do I need builders risk insurance when building a barndominium?",
    a: "Yes — if you have a construction loan, lenders require it. Even if self-financing, builders risk protects your steel kit and partially completed structure during the most financially exposed phase of your build. Materials are at risk from delivery day one, before your permanent policy can attach.",
  },
  {
    q: "Does barndominium insurance cover a shop or workshop attached to the living area?",
    a: "An attached shop is generally covered as part of the dwelling structure. Personal property in the shop (tools, equipment) has standard personal property coverage with sublimits for business-grade equipment. If you use the shop for business, an endorsement or commercial policy is needed for full coverage.",
  },
  {
    q: "How do I get a barndominium insurance quote?",
    a: "Submit a quote request online. We need: property address, approximate square footage, year built, construction type (steel frame / post-frame / metal siding), estimated replacement value, how the structure is used, and any farm/agricultural operations on the property. Same-day quotes in most cases.",
  },
] as const;

export const CREDENTIALS = [
  "Licensed in All 50 States",
  "NPN #8608479",
  "Founded 2005",
  "A.M. Best A+ Rated Carriers",
  "Barndo & Metal Building Specialists",
  "Builders Risk to Dwelling Transition",
] as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

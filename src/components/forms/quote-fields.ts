/*
 * barndoinsurance.com /quote - field definitions + validation (Mike 2026-11-17).
 *
 * Single source of truth for every control on the quote form. QuoteForm.tsx renders
 * from SECTIONS; public/__forms.html registers exactly the names/values rendered here.
 * Existing live field names are NEVER renamed (name, company, email, phone,
 * propertyAddress, city, state, zip, barndominium, squareFootage, yearBuilt,
 * estimatedValue, farmOperations, notes, currentlyInsured, desiredEffectiveDate,
 * currentCarrier, lossCount, lossDescription). Added names are camelCase.
 *
 * Max lengths mirror the underwriter PDF box (acord-forms homeowners FIELDS.md);
 * longer text is silently clipped there.
 *
 * Privacy: values (DOB, driver's license) are never logged, never sent anywhere but
 * the form POST body, and never echoed to the thank-you page or the URL.
 */
import { US_STATES } from "@/lib/quote-form-options";

export type Values = Record<string, string>;
export type Ctx = { today: string };
export type Problem = { name: string; label: string; message: string };
export type Kind =
  | "text" | "int" | "dec" | "money" | "year" | "date" | "email" | "tel" | "zip"
  | "state" | "select" | "radio" | "area" | "heading";

export interface Def {
  name: string;
  label: string;
  kind: Kind;
  max?: number;            // maxLength (PDF box capacity)
  options?: string[];      // select / radio values
  show?: (v: Values, c: Ctx) => boolean;
  req?: boolean | ((v: Values, c: Ctx) => boolean); // default true
  min?: number;            // int/money/dec/year lower bound
  hi?: number;             // int/year upper bound
  hint?: string;
  lvl?: 1;                 // follow-up (indented under its trigger)
  rows?: number;
  date?: "dob" | "future" | "past" | "any";
  auto?: string;           // autocomplete token
}
export interface Section { title: string; intro?: string; defs: Def[] }

export const STATE_CODES = US_STATES.map(([c]) => c);
const YN = ["Yes", "No"];

const yes = (n: string) => (v: Values) => v[n] === "Yes";
const anyYes = (...ns: string[]) => (v: Values) => ns.some((n) => v[n] === "Yes");

/* ---------------- option lists ---------------- */
const MARITAL = ["Married", "Single", "Divorced", "Widowed", "Separated", "Domestic partner"];
const PROPERTY_TYPE = [
  "Barndominium (steel frame / metal siding)", "Pole-barn / post-frame home", "Metal building home",
  "Barndo + shop / workshop", "Not sure",
];
const FARM_OPS = ["None — residence only", "Small hobby farm", "Working farm / ranch", "Agricultural income"];
const REASONS = [
  "Lower price", "Rate increase at renewal", "Better coverage", "New home purchase",
  "Carrier non-renewed me", "Carrier cancelled me", "Unhappy with service", "Other",
];
const PRIOR_RES = ["Owned home", "Rented house", "Rented apartment", "Lived with family", "Other"];
const OCCUPANCY = ["Primary residence", "Secondary residence", "Seasonal residence", "Tenant occupied", "Vacant"];
const PURCHASE = ["New purchase", "Existing residence"];
const CONSTRUCTION = ["Frame (wood)", "Steel / metal frame", "Post-frame / pole barn", "Masonry", "Masonry veneer", "Log", "Concrete / ICF", "Other"];
const EXTERIOR = ["Metal siding", "Stucco", "Brick", "Stone", "Vinyl siding", "Wood siding", "Fiber cement", "Block / CMU", "Other"];
const FOUNDATION = ["Slab on grade", "Crawlspace", "Full basement", "Partial basement", "Pier and beam", "Other"];
const ROOF_SHAPE = ["Gable", "Hip", "Flat", "Shed", "Gambrel", "Other"];
const ROOF_MAT = ["Metal (standing seam)", "Metal (corrugated / R-panel)", "Asphalt shingle", "Concrete / clay tile", "Slate", "Wood shake", "Membrane / flat roof", "Other"];
const ROOF_COND = ["Excellent", "Good", "Fair", "Poor"];
const GARAGE = ["None", "Attached", "Detached", "Built-in / basement", "Carport only"];
const QUALITY = ["Builder grade", "Standard", "Upgraded", "Custom / luxury"];
const WIRING = ["Copper", "Aluminum", "Knob-and-tube", "Cloth-sheathed", "Other"];
const PLUMBING = ["Copper", "PEX", "CPVC", "PVC", "Galvanized steel", "Polybutylene", "Lead", "Other"];
const WATER_HEATER = ["Gas tank", "Electric tank", "Tankless gas", "Tankless electric", "Heat pump", "Solar"];
const SEWER = ["Public sewer", "Septic system"];
const HEAT = ["Gas forced air", "Electric forced air", "Heat pump", "Electric baseboard", "Propane furnace", "Oil furnace", "Wood stove", "Radiant / hydronic", "Mini-split", "Other"];
const AC = ["Central air", "Heat pump", "Mini-split", "Evaporative cooler", "Window units", "None"];
const WATER = ["Public", "Private well"];
const FIRE_DEPT = ["Paid / career", "Volunteer", "Combination", "None / unprotected"];
const RV_BOAT = ["None", "RV", "Boat", "RV and boat"];
const COMM_VEH = ["None", "Work truck or van", "Heavy commercial vehicle"];
const SOLAR = ["None", "Owned", "Leased"];
const LOSS_STATUS = ["Open", "Closed"];
const CONSTRUCTION_STATUS = ["Complete", "Under construction", "Planned"];
const INSULATION = ["Spray foam", "Fiberglass", "Mineral wool", "Rigid board", "None", "Not sure"];
const PROTECTION_CLASS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Not sure"];

export const OPTION_LISTS = {
  MARITAL, PROPERTY_TYPE, FARM_OPS, REASONS, PRIOR_RES, OCCUPANCY, PURCHASE, CONSTRUCTION, EXTERIOR, FOUNDATION,
  ROOF_SHAPE, ROOF_MAT, ROOF_COND, GARAGE, CONSTRUCTION_STATUS, INSULATION, PROTECTION_CLASS, QUALITY, WIRING, PLUMBING, WATER_HEATER, SEWER, HEAT, AC, WATER,
  FIRE_DEPT, RV_BOAT, COMM_VEH, SOLAR, LOSS_STATUS,
};

/* ---------------- builders ---------------- */
type X = Partial<Def>;
const h = (label: string): Def => ({ name: `__h_${label}`, label, kind: "heading" });
const t = (name: string, label: string, max: number, x: X = {}): Def => ({ name, label, kind: "text", max, ...x });
const n = (name: string, label: string, x: X = {}): Def => ({ name, label, kind: "int", min: 0, ...x });
const m = (name: string, label: string, x: X = {}): Def => ({ name, label, kind: "money", min: 0, ...x });
const s = (name: string, label: string, options: string[], x: X = {}): Def => ({ name, label, kind: "select", options, ...x });
const r = (name: string, label: string, x: X = {}): Def => ({ name, label, kind: "radio", options: YN, ...x });
const st = (name: string, label: string, x: X = {}): Def => ({ name, label, kind: "state", ...x });
const d = (name: string, label: string, date: Def["date"], x: X = {}): Def => ({ name, label, kind: "date", date, ...x });
const a = (name: string, label: string, max: number, x: X = {}): Def => ({ name, label, kind: "area", max, rows: 2, ...x });

/** Prior-address block applies when the applicant has lived at the property under 3 years. */
export function underThreeYears(v: Values, c: Ctx): boolean {
  const o = v.dateOccupied;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(o ?? "")) return false;
  const [y, mo, da] = c.today.split("-").map(Number);
  const cutoff = `${String(y - 3).padStart(4, "0")}-${String(mo).padStart(2, "0")}-${String(da).padStart(2, "0")}`;
  return o > cutoff;
}

const lossRow = (i: number): Def[] => {
  const started = (v: Values) => ["Date", "Location", "Type", "Amount", "Status"].some((k) => (v[`loss${i}${k}`] ?? "").trim());
  const base: X = { lvl: 1, show: yes("hasLossesLast5Years"), req: i === 1 ? true : started };
  return [
    d(`loss${i}Date`, `Loss ${i} - date of loss`, "past", base),
    t(`loss${i}Location`, `Loss ${i} - location (city / state)`, 19, base),
    t(`loss${i}Type`, `Loss ${i} - type / cause`, 28, base),
    m(`loss${i}Amount`, `Loss ${i} - amount paid ($)`, base),
    s(`loss${i}Status`, `Loss ${i} - status`, LOSS_STATUS, base),
    t(`loss${i}ClaimNumber`, `Loss ${i} - claim number (if known)`, 20, { ...base, req: false }),
  ];
};

const YN_PROTECT: [string, string][] = [
  ["centralBurglarAlarm", "Central station burglar alarm"], ["centralFireAlarm", "Central station fire alarm"],
  ["localAlarmOnly", "Local alarm only"], ["smokeDetectors", "Smoke detectors"],
  ["carbonMonoxideDetectors", "Carbon monoxide detectors"], ["fireExtinguishers", "Fire extinguishers"],
  ["sprinklerSystem", "Sprinkler system"], ["deadboltLocks", "Deadbolt locks"],
  ["gatedCommunity", "Gated community"], ["securityCameras", "Security cameras"],
  ["leakDetection", "Leak detection"],
];
const YN_SPECIAL: [string, string][] = [
  ["historicHome", "Is the home a historic home?"], ["logHome", "Is it a log home?"],
  ["manufacturedHome", "Is it a manufactured home?"], ["modularHome", "Is it a modular home?"],
  ["earthSheltered", "Is it earth-sheltered?"], ["eifsSyntheticStucco", "Does it have EIFS / synthetic stucco?"],
  ["flatRoof", "Does it have a flat roof?"], ["woodShakeRoof", "Does it have a wood shake roof?"],
  ["unreinforcedMasonry", "Does it have unreinforced masonry?"],
];
const YN_RECREATION: [string, string][] = [
  ["swimmingPool", "Swimming pool"], ["spaHotTub", "Spa / hot tub"], ["divingBoard", "Diving board"], ["slide", "Slide"],
  ["poolFenced", "Pool fenced"], ["trampoline", "Trampoline"], ["treehouse", "Treehouse"], ["playStructure", "Play structure"],
  ["zipLine", "Zip line"], ["skateRamp", "Skate ramp"], ["pondOrLake", "Pond / lake"], ["dock", "Dock"],
  ["boatLift", "Boat lift"], ["atvDirtBikeUse", "ATV / dirt bike use"], ["shootingRange", "Shooting range"],
];
const YN_COVERAGE: [string, string][] = [
  ["replacementCostOnContents", "Replacement cost on contents"], ["extendedDwellingReplacement", "Extended dwelling replacement"],
  ["guaranteedReplacementCost", "Guaranteed replacement cost"], ["waterBackup", "Water backup"], ["serviceLine", "Service line"],
  ["equipmentBreakdown", "Equipment breakdown"], ["ordinanceOrLaw", "Ordinance or law"], ["identityTheft", "Identity theft"],
  ["homeSystems", "Home systems"], ["scheduledProperty", "Scheduled property (jewelry, art, collectibles, etc.)"],
  ["homeCyber", "Home cyber"], ["earthquake", "Earthquake"], ["floodQuoteRequested", "Flood quote requested"],
  ["personalInjury", "Personal injury"], ["umbrellaQuote", "Umbrella quote"],
];
const YN_DOCS: [string, string][] = [
  ["emailDocuments", "Email documents to me"], ["mailDocuments", "Mail documents to me"],
  ["textNotifications", "Send me text notifications"], ["esignDocuments", "I want to receive and sign my documents electronically"],
];
const YN_ATTACH: [string, string][] = [
  ["priorDeclarationsAvailable", "Do you have your prior policy declarations page to send us?"],
  ["lossRunsAvailable", "Do you have loss runs (claims history) from your prior carrier to send us?"],
  ["inspectionAvailable", "Do you have a home inspection report to send us?"],
  ["photosAvailable", "Do you have photos of the home to send us?"],
];
const pairs = (list: [string, string][], x: X = {}): Def[] => list.map(([name, label]) => r(name, label, x));

export const SYSTEM_WIRING_BAD = ["Aluminum", "Knob-and-tube", "Cloth-sheathed"];
export const SYSTEM_PLUMBING_BAD = ["Galvanized steel", "Polybutylene", "Lead"];

/* ---------------- the form ---------------- */
export const SECTIONS: Section[] = [
  {
    title: "About You",
    defs: [
      t("name", "Primary applicant - full legal name", 62, { auto: "name" }),
      d("dateOfBirth", "Date of birth", "dob", { auto: "off" }),
      s("maritalStatus", "Marital status", MARITAL),
      { name: "email", label: "Email address", kind: "email", max: 50, auto: "email" },
      { name: "phone", label: "Primary phone", kind: "tel", max: 38, auto: "tel", hint: "10-digit US number." },
      { name: "alternatePhone", label: "Alternate phone (optional)", kind: "tel", max: 38, req: false },
      t("applicantOccupation", "Occupation", 51),
      t("applicantEmployer", "Employer", 51),
      n("applicantYearsEmployed", "Years employed", { hi: 80, hint: "Whole years; enter 0 if under a year." }),
      t("driverLicenseNumber", "Driver's license number", 20, { auto: "off", hint: "Used only to prepare your quote. Letters, numbers and dashes." }),
      st("driverLicenseState", "Driver's license state"),
      r("hasCoApplicant", "Is there a co-applicant (spouse or other person on the policy)?"),
      t("coApplicantName", "Co-applicant - full legal name", 62, { lvl: 1, show: yes("hasCoApplicant") }),
      d("coApplicantDateOfBirth", "Co-applicant - date of birth", "dob", { lvl: 1, show: yes("hasCoApplicant"), auto: "off" }),
      s("coApplicantMaritalStatus", "Co-applicant - marital status", MARITAL, { lvl: 1, show: yes("hasCoApplicant") }),
      t("coApplicantOccupation", "Co-applicant - occupation", 51, { lvl: 1, show: yes("hasCoApplicant") }),
      t("coApplicantEmployer", "Co-applicant - employer", 51, { lvl: 1, show: yes("hasCoApplicant") }),
      n("coApplicantYearsEmployed", "Co-applicant - years employed", { lvl: 1, hi: 80, show: yes("hasCoApplicant") }),
    ],
  },
  {
    title: "Property Address",
    defs: [
      t("propertyAddress", "Property street address", 82, { auto: "address-line1" }),
      t("city", "Property city", 26, { auto: "address-level2" }),
      st("state", "Property state"),
      { name: "zip", label: "Property ZIP code", kind: "zip", max: 5, hint: "5-digit ZIP code." },
      t("county", "Property county", 37),
    ],
  },
  {
    title: "Mailing Address",
    defs: [
      r("mailingAddressSameAsProperty", "Is your mailing address the same as the property address?"),
      t("mailingStreetAddress", "Mailing street address", 82, { lvl: 1, show: (v) => v.mailingAddressSameAsProperty === "No" }),
      t("mailingCity", "Mailing city", 26, { lvl: 1, show: (v) => v.mailingAddressSameAsProperty === "No" }),
      st("mailingState", "Mailing state", { lvl: 1, show: (v) => v.mailingAddressSameAsProperty === "No" }),
      { name: "mailingZip", label: "Mailing ZIP code", kind: "zip", max: 5, lvl: 1, show: (v) => v.mailingAddressSameAsProperty === "No", hint: "5-digit ZIP code." },
    ],
  },
  {
    title: "Current Coverage",
    defs: [
      d("desiredEffectiveDate", "Requested effective date", "future"),
      s("reasonForShopping", "Reason for shopping", REASONS),
      t("reasonForShoppingOther", "Please describe your reason", 36, { lvl: 1, show: (v) => v.reasonForShopping === "Other" }),
      r("currentlyInsured", "Do you currently have homeowners insurance on this home?"),
      t("currentCarrier", "Current carrier", 47, { lvl: 1, show: yes("currentlyInsured") }),
      m("currentAnnualPremium", "Current annual premium ($)", { lvl: 1, show: yes("currentlyInsured"), min: 1 }),
      n("yearsWithCurrentCarrier", "Years with current carrier", { lvl: 1, show: yes("currentlyInsured"), hi: 80, hint: "Whole years; enter 0 if under a year." }),
      d("currentPolicyExpiration", "Current policy expiration date", "any", { lvl: 1, show: yes("currentlyInsured"), req: false }),
    ],
  },
  {
    title: "Ownership & Occupancy",
    defs: [
      t("namedOwners", "Named owner(s) on the deed", 65),
      t("company", "Entity or trust that owns the home (optional)", 60, { req: false }),
      d("purchaseDate", "Purchase date (or expected closing date)", "any"),
      m("purchasePrice", "Purchase price ($)", { min: 1 }),
      m("estimatedMarketValue", "Estimated market value ($)", { min: 1 }),
      m("estimatedValue", "Estimated replacement cost to rebuild ($)", { min: 1, hint: "Exact dollar amount, numbers only." }),
      r("purchaseStatus", "Is this a new purchase or an existing residence?", { options: PURCHASE }),
      r("occupancyStatus", "Occupancy status of the home", { options: OCCUPANCY }),
      d("dateOccupied", "Date occupied / expected occupancy", "any"),
      r("underRenovation", "Is the home under renovation?"),
      r("shortTermRental", "Is the home used as a short-term rental?"),
      n("numberOfFamilies", "Number of families", { min: 1, hi: 20 }),
      n("numberOfResidents", "Number of residents", { min: 1, hi: 50, hint: "Total number of people living in the home." }),
      n("monthsOccupiedPerYear", "Months occupied per year", { hi: 12 }),
      n("adultsInHousehold", "Adults in household", { hi: 50 }),
      n("childrenInHousehold", "Children in household", { hi: 50, hint: "Enter 0 if none." }),
      n("unrelatedResidents", "Unrelated residents", { hi: 50, hint: "Enter 0 if none." }),
      n("domesticEmployees", "Domestic employees", { hi: 50, hint: "Enter 0 if none." }),
      r("homeBasedBusiness", "Is a home-based business conducted on the premises?"),
      r("customersOrEmployeesVisit", "Do any customers or employees visit the premises?"),
      r("roomRentedToOthers", "Is any room, unit, or structure rented to others?"),
      r("shortTermRentalActivity", "Is there any short-term rental activity (Airbnb/VRBO)?"),
      a("occupancyExposureExplanation", "Explain each Yes above (which item and the details)", 132, { lvl: 1, show: anyYes("homeBasedBusiness", "customersOrEmployeesVisit", "roomRentedToOthers", "shortTermRentalActivity") }),
      { ...h("Prior address (you have lived at this property under 3 years)"), show: underThreeYears },
      t("priorAddress", "Prior street address", 82, { lvl: 1, show: underThreeYears }),
      t("priorCity", "Prior city", 26, { lvl: 1, show: underThreeYears }),
      st("priorState", "Prior state", { lvl: 1, show: underThreeYears }),
      { name: "priorZip", label: "Prior ZIP code", kind: "zip", max: 5, lvl: 1, show: underThreeYears, hint: "5-digit ZIP code." },
      n("yearsAtPriorAddress", "Years at prior address", { lvl: 1, show: underThreeYears, hi: 99 }),
      s("priorResidenceType", "Prior residence type", PRIOR_RES, { lvl: 1, show: underThreeYears }),
      t("priorInsuranceCarrier", "Prior insurance carrier", 47, { lvl: 1, show: underThreeYears, hint: "Enter None if you had no prior coverage." }),
    ],
  },
  {
    title: "Construction",
    defs: [
      s("barndominium", "Property type", PROPERTY_TYPE),
      { name: "yearBuilt", label: "Year built", kind: "year", min: 1800 },
      n("squareFootage", "Total living area (exact sq ft)", { min: 100, hi: 100000, hint: "Exact square feet, numbers only." }),
      n("numberOfStories", "Number of stories", { min: 1, hi: 10 }),
      n("numberOfUnits", "Number of units", { min: 1, hi: 20 }),
      s("constructionStatus", "Construction status", CONSTRUCTION_STATUS, { req: false }),
      s("constructionType", "Construction type", CONSTRUCTION),
      s("exteriorWallMaterial", "Exterior wall material", EXTERIOR),
      s("foundationType", "Foundation type", FOUNDATION),
      s("insulationType", "Insulation type", INSULATION, { req: false }),
      s("roofShape", "Roof shape", ROOF_SHAPE),
      s("roofMaterial", "Roof material", ROOF_MAT),
      { name: "roofYear", label: "Roof year (year installed)", kind: "year", min: 1800 },
      s("roofCondition", "Roof condition", ROOF_COND),
      t("roofGaugeOrWindRating", "Roof metal gauge or wind rating (if known)", 42, { req: false }),
      r("roofReplaced", "Has the roof been replaced?"),
      m("roofReplacementCost", "Roof replacement cost ($)", { lvl: 1, show: yes("roofReplaced"), min: 1 }),
      d("roofPermitDate", "Roof permit date (if known)", "past", { lvl: 1, show: yes("roofReplaced"), req: false }),
      n("bedrooms", "Bedrooms", { hi: 30 }),
      { name: "bathrooms", label: "Bathrooms", kind: "dec", min: 0.5, hint: "Use .5 for a half bath, e.g. 2.5." },
      n("garageSpaces", "Garage spaces", { hi: 20, hint: "Enter 0 if none." }),
      s("garageType", "Garage type", GARAGE),
      n("basementSqFt", "Basement sq ft", { hint: "Enter 0 if none." }),
      n("finishedBasementSqFt", "Finished basement sq ft (if any)", { req: false }),
      n("porchDeckSqFt", "Porch / deck sq ft (if any)", { req: false }),
      n("carportSqFt", "Carport sq ft (if any)", { req: false }),
      t("otherAttachedArea", "Other attached area, sq ft (if any)", 27, { req: false }),
      t("flooringTypes", "Flooring type(s)", 42),
      s("kitchenQuality", "Kitchen quality", QUALITY),
      s("bathroomQuality", "Bathroom quality", QUALITY),
      t("customFeatures", "Custom features (if any)", 31, { req: false }),
      s("solarPanels", "Solar panels", SOLAR),
      r("hasDetachedStructures", "Does the property have detached structures (shop, detached garage, guest house, barn)?"),
      t("otherStructureType", "Type of detached structure(s)", 42, { lvl: 1, show: yes("hasDetachedStructures") }),
      m("otherStructureValue", "Total value of detached structure(s) ($)", { lvl: 1, show: yes("hasDetachedStructures"), min: 1 }),
      n("detachedGarageShopSqFt", "Detached garage / shop sq ft (if any)", { lvl: 1, show: yes("hasDetachedStructures"), req: false }),
      n("guestHouseSqFt", "Guest house sq ft (if any)", { lvl: 1, show: yes("hasDetachedStructures"), req: false }),
      n("shopSqFt", "Shop sq ft (if any)", { lvl: 1, show: yes("hasDetachedStructures"), req: false }),
      t("fenceTypeLength", "Fence type / length (if any)", 42, { lvl: 1, show: yes("hasDetachedStructures"), req: false }),
      h("Special construction"),
      ...pairs(YN_SPECIAL),
      r("hasAdditionsRenovations", "Does the home have additions, renovations, or custom construction?"),
      a("additionsRenovationsDescription", "Explain each Yes in this section (what it is and the details)", 132, {
        lvl: 1,
        show: (v) => v.hasAdditionsRenovations === "Yes" || YN_SPECIAL.some(([k]) => v[k] === "Yes"),
      }),
    ],
  },
  {
    title: "Systems & Protection",
    defs: [
      n("electricalServiceAmps", "Electrical service (amps)", { min: 30, hi: 1000 }),
      s("wiringType", "Wiring type", WIRING),
      { name: "electricalUpdateYear", label: "Electrical update year (if known)", kind: "year", min: 1800, req: false },
      t("generatorTypeSize", "Generator type / size (if any)", 36, { req: false }),
      s("plumbingType", "Plumbing type", PLUMBING),
      { name: "plumbingUpdateYear", label: "Plumbing update year (if known)", kind: "year", min: 1800, req: false },
      s("waterHeaterType", "Water heater type", WATER_HEATER),
      n("waterHeaterAgeYears", "Water heater age (years)", { hi: 60 }),
      s("sewerSeptic", "Sewer / septic", SEWER),
      n("septicAge", "Septic age (years)", { lvl: 1, show: (v) => v.sewerSeptic === "Septic system", hi: 100 }),
      s("primaryHeatType", "Primary heat type", HEAT),
      { name: "heatingUpdateYear", label: "Heating update year (if known)", kind: "year", min: 1800, req: false },
      s("centralAcType", "Central AC type", AC),
      n("centralAcAgeYears", "Central AC age (years)", { lvl: 1, show: (v) => !!v.centralAcType && v.centralAcType !== "None" && v.centralAcType !== "Window units", hi: 60 }),
      t("secondaryHeatSource", "Secondary heat source (if any)", 36, { req: false }),
      s("publicPrivateWater", "Public / private water", WATER),
      t("wellDepthAge", "Well depth / age", 35, { lvl: 1, show: (v) => v.publicPrivateWater === "Private well" }),
      t("fuelTankLocationSize", "Fuel tank location / size (if any)", 35, { req: false }),
      t("gasProvider", "Gas provider (if any)", 38, { req: false }),
      t("propaneProvider", "Propane provider (if any)", 38, { req: false }),
      t("oilTankAge", "Oil tank age (if any)", 30, { req: false }),
      t("waterShutoffDevice", "Water shutoff device (if any)", 40, { req: false }),
      h("Protective devices"),
      ...pairs(YN_PROTECT),
      n("distanceToFireHydrantFeet", "Distance to fire hydrant (feet)", { hi: 100000 }),
      { name: "distanceToFireStationMiles", label: "Distance to fire station (miles)", kind: "dec", min: 0, hint: "For example 1.8." },
      s("fireDepartmentType", "Fire department type", FIRE_DEPT),
      s("protectionClass", "Fire protection class (if known)", PROTECTION_CLASS, { req: false }),
      h("Condition of the home"),
      r("knobAndTubeWiring", "Any knob-and-tube, aluminum, or cloth wiring?"),
      r("badPlumbing", "Any polybutylene, galvanized, or lead plumbing?"),
      r("activeLeaksOrDamage", "Any active leaks, unrepaired damage, or maintenance issues?"),
      r("openPermitsOrViolations", "Any open permits or code violations?"),
      a("systemsConditionExplanation", "Explain each Yes above and list completed updates with dates", 132, {
        lvl: 1, show: anyYes("knobAndTubeWiring", "badPlumbing", "activeLeaksOrDamage", "openPermitsOrViolations"),
      }),
    ],
  },
  {
    title: "Animals, Hazards & Vehicles",
    defs: [
      n("numberOfDogs", "Number of dogs", { hi: 50, hint: "Enter 0 if none." }),
      t("dogBreeds", "Dog breed(s)", 52, { lvl: 1, show: (v) => parseInt(v.numberOfDogs || "0", 10) > 0 }),
      n("numberOfOtherAnimals", "Number of other animals", { hi: 500, hint: "Enter 0 if none." }),
      t("otherAnimalTypes", "Other animal type(s)", 32, { lvl: 1, show: (v) => parseInt(v.numberOfOtherAnimals || "0", 10) > 0 }),
      s("farmOperations", "Farm / ranch operations on site?", FARM_OPS),
      r("biteOrAttackHistory", "Any bite or attack history?"),
      t("biteOrAttackDetails", "Bite or attack: date and details", 52, { lvl: 1, show: yes("biteOrAttackHistory") }),
      r("livestockOrFarmAnimals", "Any livestock or farm animals?"),
      h("Pool, water and recreation features"),
      ...pairs(YN_RECREATION),
      t("poolTypeYear", "Pool type / year", 40, { lvl: 1, show: yes("swimmingPool") }),
      t("fenceHeightGateType", "Pool fence height / gate type", 47, { lvl: 1, show: yes("poolFenced") }),
      t("waterFeatureDetails", "Pond / lake details", 41, { lvl: 1, show: yes("pondOrLake") }),
      h("Other exposures"),
      r("firearmsOnPremises", "Any firearms kept on the premises?"),
      r("solidFuelAppliance", "Any wood stove, fireplace, or solid-fuel appliance?"),
      r("steepTerrainOrCliff", "Any unusually steep terrain, retaining wall, or cliff exposure?"),
      r("priorForeclosureBankruptcyCancellation", "Any prior foreclosure, bankruptcy, or insurance cancellation?"),
      r("felonyOrFraudResident", "Does any resident have a felony conviction or fraud-related offense?"),
      a("firearmsExplanation", "Firearms on premises: describe the firearms and how they are stored / secured", 132, { lvl: 1, show: yes("firearmsOnPremises") }),
      a("solidFuelExplanation", "Solid-fuel appliance: describe the type, location, installation and last inspection", 132, { lvl: 1, show: yes("solidFuelAppliance") }),
      a("hazardsExplanation", "Explain each Yes above, including safeguards and dates", 132, {
        lvl: 1, show: anyYes("steepTerrainOrCliff", "priorForeclosureBankruptcyCancellation", "felonyOrFraudResident"),
      }),
      n("numberOfVehiclesGaraged", "Number of vehicles garaged", { hi: 50, hint: "Enter 0 if none." }),
      s("rvBoatStored", "RV / boat stored on site", RV_BOAT),
      s("commercialVehicleUse", "Commercial vehicle use", COMM_VEH),
    ],
  },
  {
    title: "Property Exposures & Updates",
    intro: "Please answer each in your own words. If none, write \"None\".",
    defs: [
      a("businessRentalExposureDescription", "Describe any business, rental, or unusual occupancy exposure at the property", 132),
      a("additionsDetachedStructuresDescription", "Describe any additions or detached structures (shop, guest house, barn, etc.)", 132),
      a("electricalPlumbingUpdatesDescription", "Describe any electrical or plumbing updates (what, when, who did the work)", 132),
    ],
  },
  {
    title: "Coverage Requested",
    defs: [
      m("coverageADwelling", "Coverage A - Dwelling ($)", { min: 1 }),
      m("coverageBOtherStructures", "Coverage B - Other structures ($)"),
      m("coverageCPersonalProperty", "Coverage C - Personal property ($)"),
      m("coverageDLossOfUse", "Coverage D - Loss of use ($)"),
      m("coverageEPersonalLiability", "Coverage E - Personal liability ($)", { min: 1 }),
      m("coverageFMedicalPayments", "Coverage F - Medical payments ($)"),
      m("allOtherPerilsDeductible", "All other perils deductible ($)", { min: 1 }),
      t("windHailDeductible", "Wind / hail deductible (if separate)", 41, { req: false }),
      t("namedStormDeductible", "Named storm deductible (if separate)", 41, { req: false }),
      m("estimatedPersonalPropertyValue", "Estimated personal property value ($)", { min: 1 }),
      m("estimatedAdditionalLivingExpense", "Estimated additional living expense need ($)"),
      h("Coverage options"),
      ...pairs(YN_COVERAGE),
      m("jewelryValue", "Scheduled - jewelry value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      m("fineArtsValue", "Scheduled - fine arts value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      m("firearmsValue", "Scheduled - firearms value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      m("collectiblesValue", "Scheduled - collectibles value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      m("musicalInstrumentsValue", "Scheduled - musical instruments value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      m("otherScheduledValue", "Scheduled - other property value ($)", { lvl: 1, show: yes("scheduledProperty"), hint: "Enter 0 if none." }),
      a("scheduledPropertyList", "List high-value items, appraisals, and requested scheduled limits", 132, { lvl: 1, show: yes("scheduledProperty") }),
    ],
  },
  {
    title: "Loss History (Past 5 Years)",
    defs: [
      r("hasLossesLast5Years", "Any property or liability claims or losses in the past 5 years?"),
      n("lossCount", "How many claims or losses?", { lvl: 1, show: yes("hasLossesLast5Years"), min: 1, hi: 99 }),
      ...lossRow(1), ...lossRow(2), ...lossRow(3), ...lossRow(4),
    ],
  },
  {
    title: "Mortgage",
    defs: [
      r("hasMortgage", "Is the property mortgaged?"),
      t("mortgageCompany", "Mortgage company / lender", 63, { lvl: 1, show: yes("hasMortgage") }),
      t("mortgageLoanNumber", "Loan number (if handy)", 63, { lvl: 1, show: yes("hasMortgage"), req: false }),
      t("mortgageeAddress", "Mortgagee mailing address", 82, { lvl: 1, show: yes("hasMortgage") }),
      t("mortgageeCity", "Mortgagee city", 26, { lvl: 1, show: yes("hasMortgage") }),
      st("mortgageeState", "Mortgagee state", { lvl: 1, show: yes("hasMortgage") }),
      { name: "mortgageeZip", label: "Mortgagee ZIP code", kind: "zip", max: 5, lvl: 1, show: yes("hasMortgage"), hint: "5-digit ZIP code." },
      t("additionalInterestName", "Additional interest name (if any, other than mortgagee)", 63, { req: false }),
      t("additionalInterestAddress", "Additional interest address (if any)", 82, { req: false }),
    ],
  },
  {
    title: "Documents & Preferences",
    intro: "Do not attach or type documents here. Your agent will arrange to collect anything you mark Yes.",
    defs: [...pairs(YN_DOCS), ...pairs(YN_ATTACH)],
  },
  {
    title: "Signature",
    intro: "Type your full legal name as your electronic signature and enter today's date.",
    defs: [
      t("applicantSignature", "Applicant signature (type your full legal name)", 62, { auto: "off" }),
      d("signatureDate", "Signature date (today)", "past"),
    ],
  },
];

export const YN_NAMES = [
  ...YN_DOCS, ...YN_ATTACH, ...YN_PROTECT, ...YN_SPECIAL, ...YN_RECREATION, ...YN_COVERAGE,
].map(([k]) => k);

/* ---------------- derived values (submitted with the form) ---------------- */
export const MAILING_COPY: [string, string][] = [
  ["propertyAddress", "mailingStreetAddress"], ["city", "mailingCity"], ["state", "mailingState"], ["zip", "mailingZip"],
];

export function effectiveValues(v: Values, today: string): Values {
  const out: Values = { ...v };
  if (v.mailingAddressSameAsProperty === "Yes") for (const [from, to] of MAILING_COPY) out[to] = v[from] ?? "";
  if (v.hasLossesLast5Years === "No") {
    out.lossCount = "0";
    out.lossDescription = "No claims or losses in the past 5 years";
  } else if (v.hasLossesLast5Years === "Yes") {
    const parts: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const row = ["Date", "Type", "Amount", "Status"].map((k) => (v[`loss${i}${k}`] ?? "").trim());
      if (row.some(Boolean)) parts.push(`${row[0]} ${row[1]} $${row[2]} ${row[3]}`.replace(/\s+/g, " ").trim());
    }
    out.lossDescription = parts.join("; ");
  } else out.lossDescription = "";
  return out;
}

/* ---------------- validation ---------------- */
const digits = (x: string) => x.replace(/\D/g, "");
const isoOk = (x: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(x)) return false;
  const dt = new Date(`${x}T00:00:00Z`);
  return !Number.isNaN(dt.getTime()) && dt.toISOString().slice(0, 10) === x;
};
const shiftYears = (iso: string, yrs: number) => {
  const [y, mo, da] = iso.split("-").map(Number);
  return `${String(y + yrs).padStart(4, "0")}-${String(mo).padStart(2, "0")}-${String(da).padStart(2, "0")}`;
};

export function isVisible(def: Def, v: Values, c: Ctx): boolean {
  return def.show ? def.show(v, c) : true;
}
export function isRequired(def: Def, v: Values, c: Ctx): boolean {
  if (def.kind === "heading") return false;
  if (def.req === undefined) return true;
  return typeof def.req === "function" ? def.req(v, c) : def.req;
}

export function validate(raw: Values, today: string): Problem[] {
  const c: Ctx = { today };
  const v = effectiveValues(raw, today);
  const p: Problem[] = [];
  const bad = (def: Def, message: string) => p.push({ name: def.name, label: def.label, message });
  const thisYear = today === "0000-00-00" ? new Date().getFullYear() : parseInt(today.slice(0, 4), 10);

  for (const sec of SECTIONS) {
    for (const def of sec.defs) {
      if (def.kind === "heading" || !isVisible(def, v, c)) continue;
      const req = isRequired(def, v, c);
      const val = (v[def.name] ?? "").trim();
      const L = def.label;
      if (!val) {
        if (req) {
          if (def.kind === "radio" || def.kind === "select" || def.kind === "state") bad(def, `Please choose an answer: ${L}`);
          else if (def.kind === "int" || def.kind === "money") bad(def, `${L} is required (enter 0 if none).`);
          else bad(def, `${L} is required.`);
        }
        continue;
      }
      if (def.max && val.length > def.max && def.kind !== "date") { bad(def, `${L} must be ${def.max} characters or fewer.`); continue; }
      switch (def.kind) {
        case "radio":
        case "select":
          if (!(def.options ?? []).includes(val)) bad(def, `Please choose a valid answer: ${L}`);
          break;
        case "state":
          if (!STATE_CODES.includes(val)) bad(def, `${L} must be a valid state.`);
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) bad(def, `${L} must be a valid email, like name@example.com.`);
          break;
        case "tel":
          if (digits(val).length !== 10) bad(def, `${L} must be a 10-digit US number.`);
          break;
        case "zip":
          if (!/^\d{5}$/.test(val) || val === "00000") bad(def, `${L} must be a real 5-digit ZIP (for example 85249), not a state.`);
          break;
        case "int": {
          if (!/^\d{1,9}$/.test(val)) { bad(def, `${L} must be a whole number.`); break; }
          const k = parseInt(val, 10);
          if (def.min !== undefined && k < def.min) bad(def, `${L} must be at least ${def.min}.`);
          else if (def.hi !== undefined && k > def.hi) bad(def, `${L} must be ${def.hi} or less.`);
          break;
        }
        case "dec": {
          if (!/^\d{1,4}(\.\d{1,2})?$/.test(val)) { bad(def, `${L} must be a number, like 2.5.`); break; }
          if (def.name === "bathrooms" && !/^\d{1,2}(\.5|\.0|\.50|\.00)?$/.test(val)) { bad(def, `${L} must be a whole or half number, like 2 or 2.5.`); break; }
          if (def.min !== undefined && parseFloat(val) < def.min) bad(def, `${L} must be at least ${def.min}.`);
          break;
        }
        case "money": {
          if (!/^\d{1,10}(\.\d{1,2})?$/.test(val)) { bad(def, `${L} must be an exact dollar amount in numbers, like 450000.`); break; }
          if (def.min !== undefined && parseFloat(val) < def.min) bad(def, `${L} must be at least ${def.min}.`);
          break;
        }
        case "year": {
          if (!/^\d{4}$/.test(val)) { bad(def, `${L} must be a 4-digit year, like 2008.`); break; }
          const y = parseInt(val, 10);
          if (y < (def.min ?? 1800) || y > thisYear + 1) bad(def, `${L} must be a year between ${def.min ?? 1800} and ${thisYear + 1}.`);
          break;
        }
        case "date": {
          if (!isoOk(val)) { bad(def, `${L} must be a valid date.`); break; }
          if (today === "0000-00-00") break;
          if (def.date === "dob") {
            if (val > shiftYears(today, -18)) bad(def, `${L}: the applicant must be at least 18.`);
            else if (val < shiftYears(today, -110)) bad(def, `${L} is not a valid date of birth.`);
          } else if (def.date === "future") {
            if (val < today) bad(def, `${L} must be today or a future date.`);
            else if (val > shiftYears(today, 1)) bad(def, `${L} must be within the next year.`);
          } else if (def.date === "past") {
            if (val > today) bad(def, `${L} cannot be in the future.`);
          } else if (val > shiftYears(today, 2) || val < "1900-01-01") bad(def, `${L} is not a valid date.`);
          break;
        }
        default:
          break;
      }
    }
  }

  // cross-field rules
  const flag = (name: string, label: string, message: string) => { if (!p.some((x) => x.name === name)) p.push({ name, label, message }); };
  if (v.extendedDwellingReplacement === "Yes" && v.guaranteedReplacementCost === "Yes")
    flag("guaranteedReplacementCost", "Guaranteed replacement cost", "Extended dwelling replacement and guaranteed replacement cost cannot both be Yes - choose one.");
  if (v.shortTermRental && v.shortTermRentalActivity && v.shortTermRental !== v.shortTermRentalActivity)
    flag("shortTermRentalActivity", "Short-term rental activity (Airbnb/VRBO)", "Your two short-term rental answers must match.");
  if (SYSTEM_WIRING_BAD.includes(v.wiringType ?? "") && v.knobAndTubeWiring === "No")
    flag("knobAndTubeWiring", "Knob-and-tube, aluminum, or cloth wiring", "Your wiring type is listed above as aluminum, knob-and-tube, or cloth - answer Yes here.");
  if (SYSTEM_PLUMBING_BAD.includes(v.plumbingType ?? "") && v.badPlumbing === "No")
    flag("badPlumbing", "Polybutylene, galvanized, or lead plumbing", "Your plumbing type is listed above as galvanized, polybutylene, or lead - answer Yes here.");
  if (v.hasLossesLast5Years === "Yes" && v.lossCount && !p.some((x) => x.name === "lossCount")) {
    const rows = [1, 2, 3, 4].filter((i) => ["Date", "Location", "Type", "Amount", "Status"].some((k) => (v[`loss${i}${k}`] ?? "").trim())).length;
    if (parseInt(v.lossCount, 10) < rows) flag("lossCount", "How many claims or losses?", "The number of claims cannot be fewer than the loss rows you filled in.");
  }

  if (v.signatureDate && today !== "0000-00-00" && v.signatureDate !== today)
    flag("signatureDate", "Signature date", "The signature date must be today's date.");
  // attestation
  if (v.applicantAttestation !== "Yes") p.push({ name: "applicantAttestation", label: "Confirmation that the information is accurate", message: "Please confirm the information is accurate before submitting." });
  return p;
}

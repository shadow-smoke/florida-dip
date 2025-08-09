class County {
    constructor(name, adjacencies, player, type) {
        this.name = name;
        this.adjacencies = adjacencies;
        this.player = player;
        this.type = type;
    }

    validateMove(countyName) {
        return adjacencies.includes(countyName);
    }
}

const allCountyNames = {
    'Holmes': ['Alabama', 'Walton', 'Bay', 'Jackson'],
    'Jackson': ['Alabama', 'Holmes', 'Calhoun', 'Bay', 'Liberty', 'Leon', 'Georgia'],
    'Liberty': ['Jackson', 'Calhoun', 'Leon', 'Franklin'],
    'Leon': ['Jackson', 'Liberty', 'Franklin', 'Jeff', 'Georgia'],
    'Jeff': ['Leon', 'Franklin', 'Taylor', 'Madison', 'Georgia'],
    'Madison': ['Jeff', 'Taylor', 'Lafayette', 'Suwannee', 'Georgia'],
    'Suwannee': ['Madison', 'Lafayette', 'Columbia', 'Georgia'],
    'Columbia': ['Suwannee', 'Lafayette', 'Alachua', 'St.Johns', 'Duval', 'Nassau', 'Georgia'],
    'Lafayette': ['Madison', 'Taylor', 'Dixie', 'Levy', 'Alachua', 'Columbia', 'Suwannee'],
    'Alachua': ['Columbia', 'Lafayette', 'Levy', 'Marion', 'Putnam', 'St.Johns'],
    'Marion': ['Alachua', 'Levy', 'Cirtus', 'Lake', 'Volusa', 'Putnam'],
    'Lake': ['Marion', 'Citrus', 'Sumter', 'Polk', 'Orange', 'Volusa'],
    'Orange': ['Volusa', 'Lake', 'Polk', 'Osceola', 'Brevard'],
    'Polk': ['Lake', 'Sumter', 'Hills', 'Desoto', 'Highlands', 'Osceola', 'Orange'],
    'Osceloa': ['Orange', 'Polk', 'Highlands', 'Okeechobee', 'Indian_River', 'Brevard']
    'Desoto': ['Polk', 'Hills', 'Sarasota', 'Charlotte', 'Glades', 'Highlands'],
    'Highlands': ['Polk', 'Desoto', 'Glades', 'Okeechobee', 'Osceloa'],
    'Okeechobee': ['Osceola', 'Highlands', 'Glades', 'Palm_Beach', 'Indian_River'],
    'Glades': ['Highlands', 'Desoto', 'Charlotte', 'Collier', 'Broward', 'Palm_Beach', 'Okeechobee'],
    // Sea territories
    'Emerald': ['Alabama', 'Escambia', 'Okaloosa', 'Walton', 'Forgotten', 'Gulf', 'Escarpment'],
    'Forgotten': ['Emerald', 'Walton', 'Bay', 'Calhoun', 'Franklin', 'Big_Bend', 'Escarpment'],
    'Big_Bend': ['Forgotten', 'Franklin', 'Taylor', 'Dixie', 'Levy', 'Citrus', 'Sumter', 'Escarpment', 'Culture'],
    'Gulf': ['Emerald', 'Escarpment', 'Key', 'South'],
    'Escarpment': ['Emerald', 'Forgotten', 'Big_Bend', ' Gulf', 'Culture', 'Paradise', 'Key'],
    'Culture': ['Big_Bend', 'Escarpment', 'Sumter', 'Pine', 'Hills', 'Sarasota', 'Paradise'],
    'Paradise': ['Escarpment', 'Sarasota', 'Charlotte', 'Collier', 'Key', 'South'],
    'South': ['Paradise', 'Collier', 'Gulf', 'Key', 'Gold', 'Bahamas'],
    'Bahamas': ['Gold', 'South', 'Atlantic', 'Treasure'],
    'Gold': ['Treasure', 'Palm_Beach', 'Broward', 'Dade', 'Bahamas'],
    'Treasure': ['Brevard', 'Indian_River', 'Palm Beach', 'Gold', 'Bahamas', 'Space', 'Atlantic'],
    'Space': ['First', 'Atlantic', 'Putnam', 'Volusa', 'Brevard', 'Treasure'],
    'First': ['Georgia', 'Atlantic', 'Nassau', 'Duval', 'St.Johns', 'Putnam', 'Space'],
    'Atlantic': ['First', 'Space', 'Treasure', 'Bahamas'],

    // Land/sea territories (can be accessed by both armies and fleets)
    'Alabama': ['Georgia', 'Escambia', 'Okaloosa', 'Walton', 'Holmes', 'Jackson'],
    'Georgia': ['Alabama', 'Jackson', 'Leon', 'Jeff', 'Madison', 'Suwannee', 'Columbia', 'Nassau'],
    'Escambia': ['Alabama', 'Okaloosa', 'Emerald'],
    'Okaloosa': ['Alabama', 'Escambia', 'Walton', 'Emerald'],
    'Walton': ['Alabama', 'Okaloosa', 'Holmes', 'Bay', 'Emerald', 'Forgotten'],
    'Bay': ['Walton', 'Holmes', 'Jackson', 'Calhoun', 'Forgotten'],
    'Calhoun': ['Jackson', 'Bay', 'Forgotten', 'Franklin', 'Liberty'],
    'Franklin': ['Leon', 'Liberty', 'Forgotten', 'Big_Bend', 'Taylor', 'Jeff'],
    'Taylor': ['Jeff', 'Franklin', 'Big_Bend', 'Dixie', 'Lafayette', 'Madison'],
    'Dixie': ['Lafayette', 'Taylor', 'Big_Bend', 'Levy'],
    'Levy': ['Lafayette', 'Dixie', 'Big_Bend', 'Citrus', 'Marion', 'Alachua'],
    'Citrus': ['Marion', 'Levy', 'Big_Bend', 'Sumter', 'Lake'],
    'Sumter': ['Citrus', 'Big_Bend', 'Culture', 'Pine', 'Hills', 'Polk', 'Lake'],
    'Pine': ['Sumter', 'Culture', 'Hills'],
    'Hills': ['Sumter', 'Pine', 'Culture', 'Sarasota', 'Desoto', 'Polk'],
    'Sarasota': ['Hills', 'Culture', 'Paradise', 'Charlotte', 'Desoto'],
    'Charlotte': ['Desoto', 'Sarasota', 'Paradise', 'Collier', 'Glades'],
    'Collier': ['Glades', 'Charlotte', 'Paradise', 'South', 'Dade', 'Broward'],
    'Key': ['Paradise', 'Escarpment', 'Gulf', 'South'],
    'Dade': ['Broward', 'Collier', 'Gold'],
    'Broward': ['Palm_Beach', 'Glades', 'Collier', 'Dade', 'Gold'],
    'Palm_Beach': ['Indian_River', 'Okeechobee', 'Glades', 'Broward', 'Gold', 'Treasure'],
    'Indian_River': ['Brevard', 'Osceola', 'Okeechobee', 'Palm_Beach', 'Treasure'],
    'Brevard': ['Volusa', 'Orange', 'Osceola', 'Indian_River', 'Treasure', 'Space'],
    'Volusa': ['Putnam', 'Marion', 'Lake', 'Orange', 'Brevard', 'Space'],
    'Putnam': ['St.Johns', 'Alachua', 'Marion', 'Volusa', 'Space', 'First'],
    'St.Johns': ['Duval', 'Columbia', 'Alachua', 'Putnam', 'First'],
    'Duval': ['Nassau', 'Columbia', 'St.Johns', 'First'],
    'Nassau': ['Georgia', 'Columbia', 'Duval', 'First']
}

const startingUnits = {
    'Dade': { 'player': 'Miami', 'type': 'fleet' },
    'Collier': { 'player': 'Miami', 'type': 'army' },
    'Broward': { 'player': 'Miami', 'type': 'army' },

    'Brevard': { 'player': 'Orlando', 'type': 'fleet' },
    'Orange': { 'player': 'Orlando', 'type': 'army' },
    'Okeechobee': { 'player': 'Orlando', 'type': 'army' },

    'Pine': { 'player': 'Tampa', 'type': 'fleet' },
    'Hills': { 'player': 'Tampa', 'type': 'army' },
    'Citrus': { 'player': 'Tampa', 'type': 'army' },

    'Duval': { 'player': 'Jacksonville', 'type': 'fleet' },
    'Nassau': { 'player': 'Jacksonville', 'type': 'army' },
    'St.Johns': { 'player': 'Jacksonville', 'type': 'army' },

    'Taylor': { 'player': 'Tallahassee', 'type': 'fleet' },
    'Leon': { 'player': 'Tallahassee', 'type': 'army' },
    'Franklin': { 'player': 'Tallahassee', 'type': 'army' },

    'Escambia': { 'player': 'Pensacola', 'type': 'fleet' },
    'Okaloosa': { 'player': 'Pensacola', 'type': 'army' },
    'Walton': { 'player': 'Pensacola', 'type': 'army' },
};

function initializeGame(countyNames, startingPlayers) {
    counties = {}
    for (key in countyNames) {
        counties[key] = new County(key, countyNames[key], '', '');
    }

    for (key in startingPlayers) {
        counties[key].player = startingPlayers[key]['player'];
        counties[key].type = startingPlayers[key]['type'];
    }

    return counties;
}

console.log(initializeGame(allCountyNames, startingUnits));

// document.addEventListener('DOMContentLoaded', () => {
//     // --- DOM Elements ---
//     // The querySelectorAll now also includes the SVG group for the units, if it exists.
//     const territories = document.querySelectorAll('#custom-map rect, #custom-map circle, #custom-map polygon, #custom-map path');
//     const statusMessage = document.getElementById('status-message');
//     const ordersList = document.getElementById('orders-list');
//     const clearButton = document.getElementById('clear-button');
//     const processTurnButton = document.getElementById('process-turn-button');
//     const unitsLayer = document.getElementById('units-layer');
//     const mapSvg = document.querySelector('#custom-map');

//     // Order type buttons
//     const moveBtn = document.getElementById('move-btn');
//     const holdBtn = document.getElementById('hold-btn');
//     const supportBtn = document.getElementById('support-btn');

//     // Display elements for current order being formed
//     const displayOrigin = document.getElementById('display-origin');
//     const displayDestination = document.getElementById('display-destination');
//     const displaySupportTarget = document.getElementById('display-support-target');

//     // --- Game State Variables ---
//     const activePlayer = 'england'; // Set the active player for this sandbox
//     const orders = []; // Array to store all issued orders for the turn
//     let currentOrderType = 'move'; // Default order type (e.g., 'move', 'hold', 'support')
//     let currentOrderState = {
//         origin: null,
//         destination: null,
//         supportTarget: null
//     };

//     // counties = [
//     //     new County('Dade', [''])
//     // ]

//     // The 'units' object now contains your custom territories.
//     const units = {
//         'Dade': { 'player': 'Miami', 'type': 'fleet' },
//         'Collier': { 'player': 'Miami', 'type': 'army' },
//         'Broward': { 'player': 'Miami', 'type': 'army' },

//         'Brevard': { 'player': 'Orlando', 'type': 'fleet' },
//         'Orange': { 'player': 'Orlando', 'type': 'army' },
//         'Okeechobee': { 'player': 'Orlando', 'type': 'army' },

//         'Pine': { 'player': 'Tampa', 'type': 'fleet' },
//         'Hills': { 'player': 'Tampa', 'type': 'army' },
//         'Citrus': { 'player': 'Tampa', 'type': 'army' },

//         'Duval': { 'player': 'Jacksonville', 'type': 'fleet' },
//         'Nassau': { 'player': 'Jacksonville', 'type': 'army' },
//         'St.Johns': { 'player': 'Jacksonville', 'type': 'army' },

//         'Taylor': { 'player': 'Tallahassee', 'type': 'fleet' },
//         'Leon': { 'player': 'Tallahassee', 'type': 'army' },
//         'Franklin': { 'player': 'Tallahassee', 'type': 'army' },

//         'Escambia': { 'player': 'Pensacola', 'type': 'fleet' },
//         'Okaloosa': { 'player': 'Pensacola', 'type': 'army' },
//         'Walton': { 'player': 'Pensacola', 'type': 'army' },
//     };
    
//     // Define land and sea territories for validation
//     const armyTerritories = ['Holmes', 'Jackson', 'Liberty', 'Leon', 'Jeff', 'Madison', 'Suwannee', 'Columbia', 'Lafayette', 'Alachua', 'Marion', 'Lake', 'Orange', 'Osceola', 'Polk', 'Desoto', 'Highlands', 'Okeechobee', 'Glades'];
//     const fleetTerritories = ['Emerald', 'Forgotten', 'Big_Bend', 'Gulf', 'Escarpment', 'Culure', 'Paradise', 'South', 'Bahamas', 'Gold', 'Treasure', 'Space', 'First', 'Atlantic'];
//     const armyAndFleetTerritories = ['Escambia', 'Okaloosa', 'Walton', 'Bay', 'Calhoun', 'Franklin', 'Taylor', 'Dixie', 'Levy', 'Citrus', 'Sumter', 'Pine', 'Hills', 'Sarasota', 'Charlotte', 'Collier', 'Key', 'Dade', 'Broward', 'Palm Beach', 'Indian_River', 'Brevard', 'Volusa', 'Putnam', 'Duval', 'Nassau']
    
//     // THIS OBJECT WILL NOW BE POPULATED DYNAMICALLY
//     let territoryCenters = {};
    
//     // --- Adjacency Rules ---
//     // This object defines which territories are adjacent to which.
//     // The keys are the territory IDs, and the values are arrays of adjacent territory IDs.
//     const adjacencies = {
//         // Land territoriesw
//         'Holmes': ['Alabama', 'Walton', 'Bay', 'Jackson'],
//         'Jackson': ['Alabama', 'Holmes', 'Calhoun', 'Bay', 'Liberty', 'Leon', 'Georgia'],
//         'Liberty': ['Jackson', 'Calhoun', 'Leon', 'Franklin'],
//         'Leon': ['Jackson', 'Liberty', 'Franklin', 'Jeff', 'Georgia'],
//         'Jeff': ['Leon', 'Franklin', 'Taylor', 'Madison', 'Georgia'],
//         'Madison': ['Jeff', 'Taylor', 'Lafayette', 'Suwannee', 'Georgia'],
//         'Suwannee': ['Madison', 'Lafayette', 'Columbia', 'Georgia'],
//         'Columbia': ['Suwannee', 'Lafayette', 'Alachua', 'St.Johns', 'Duval', 'Nassau', 'Georgia'],
//         'Lafayette': ['Madison', 'Taylor', 'Dixie', 'Levy', 'Alachua', 'Columbia', 'Suwannee'],
//         'Alachua': ['Columbia', 'Lafayette', 'Levy', 'Marion', 'Putnam', 'St.Johns'],
//         'Marion': ['Alachua', 'Levy', 'Cirtus', 'Lake', 'Volusa', 'Putnam'],
//         'Lake': ['Marion', 'Citrus', 'Sumter', 'Polk', 'Orange', 'Volusa'],
//         'Orange': [],
//         'Polk': [],
//         'Osceloa': [],
//         'Desoto': [],
//         'Highlands': [],
//         'Okeechobee': [],
//         'Glades': [],

        
//         // Sea territories
//         'Emerald': ['Alabama', 'Escambia', 'Okaloosa', 'Walton', 'Forgotten', 'Gulf', 'Escarpment'],
//         'Forgotten': ['Emerald', 'Walton', 'Bay', 'Calhoun', 'Franklin', 'Big_Bend', 'Escarpment'],
//         'Big_Bend': ['Forgotten', 'Franklin', 'Taylor', 'Dixie', 'Levy', 'Citrus', 'Sumter', 'Escarpment', 'Culture'],
//         'Gulf': ['Emerald', 'Escarpment', 'Key', 'South'],
//         'Escarpment': ['Emerald', 'Forgotten', 'Big_Bend', ' Gulf', 'Culture', 'Paradise', 'Key'],
//         'Culture': ['Big_Bend', 'Escarpment', 'Sumter', 'Pine', 'Hills', 'Sarasota', 'Paradise'],
//         'Paradise': ['Escarpment', 'Sarasota', 'Charlotte', 'Collier', 'Key', 'South'],
//         'South': ['Paradise', 'Collier', 'Gulf', 'Key', 'Gold', 'Bahamas'],
//         'Bahamas': ['Gold', 'South', 'Atlantic', 'Treasure'],
//         'Gold': ['Treasure', 'Palm_Beach', 'Broward', 'Dade', 'Bahamas'],
//         'Treasure': ['Brevard', 'Indian_River', 'Palm Beach', 'Gold', 'Bahamas', 'Space', 'Atlantic'],
//         'Space': ['First', 'Atlantic', 'Putnam', 'Volusa', 'Brevard', 'Treasure'],
//         'First': ['Georgia', 'Atlantic', 'Nassau', 'Duval', 'St.Johns', 'Putnam', 'Space'],
//         'Atlantic': ['First', 'Space', 'Treasure', 'Bahamas'],
        
//         // Land/sea territories (can be accessed by both armies and fleets)
//         'Alabama': ['Georgia', 'Escambia', 'Okaloosa', 'Walton', 'Holmes', 'Jackson'],
//         'Georgia': ['Alabama', 'Jackson', 'Leon', 'Jeff', 'Madison', 'Suwannee', 'Columbia', 'Nassau'],
//         'Escambia': ['Alabama', 'Okaloosa', 'Emerald'],
//         'Okaloosa': ['Alabama', 'Escambia', 'Walton', 'Emerald'],
//         'Walton': ['Alabama', 'Okaloosa', 'Holmes', 'Bay', 'Emerald', 'Forgotten'],
//         'Bay': ['Walton', 'Holmes', 'Jackson', 'Calhoun', 'Forgotten'],
//         'Calhoun': [],
//         'Franklin': [],
//         'Taylor': [],
//         'Dixie': [],
//         'Levy': [],
//         'Citrus': [],
//         'Sumter': [],
//         'Pine': [],
//         'Hills': [],
//         'Sarasota': [],
//         'Charlotte': [],
//         'Collier': [],
//         'Key': [],
//         'Dade': [],
//         'Broward': [],
//         'Palm_Beach': [],
//         'Indian_River': [],
//         'Brevard': [],
//         'Volusa': [],
//         'Putnam': [],
//         'St.Johns': [],
//         'Duval': [],
//         'Nassau': [],
        
//         // You can add more adjacency rules here for the rest of your territories.
//         // Remember to check the adjacencies for both land and sea units where appropriate.
//     };
    

//     // --- New Function to Calculate Centers ---

//     /**
//      * Calculates the center coordinates for each territory on the map.
//      * This function should be called once the DOM is ready.
//      */
//     function calculateTerritoryCenters() {
//         territoryCenters = {};
//         territories.forEach(territory => {
//             // Check if the territory has a getBBox method
//             if (typeof territory.getBBox === 'function') {
//                 const bbox = territory.getBBox();
//                 const centerX = bbox.x + bbox.width / 2;
//                 const centerY = bbox.y + bbox.height / 2;
//                 territoryCenters[territory.id] = { x: centerX, y: centerY };
//             }
//         });
//         console.log("Calculated territory centers:", territoryCenters);
//     }

//     // --- Helper Functions ---

//     /**
//      * Gets a unit object by its territory ID.
//      * @param {string} territoryId The ID of the territory to check.
//      * @returns {object|null} The unit object or null if no unit is found.
//      */
//     function getUnitByTerritoryId(territoryId) {
//         return units[territoryId] || null;
//     }

//     /**
//      * Renders all units from the `units` object onto the map.
//      */
//     function renderUnits() {
//         if (!unitsLayer) {
//             console.error("The 'units-layer' element was not found. Please ensure your SVG has <g id='units-layer'></g> inside it.");
//             return;
//         }
//         unitsLayer.innerHTML = ''; // Clear the units layer first
//         for (const territoryId in units) {
//             const unit = units[territoryId];
//             const center = territoryCenters[territoryId];
//             if (unit && center) {
//                 drawUnit(unitsLayer, unit, center);
//             } else {
//                 console.warn(`Could not render unit: Territory ID "${territoryId}" not found or its center could not be calculated.`);
//             }
//         }
//     }

//     /**
//      * Clears all units from the units layer visually.
//      */
//     function clearUnits() {
//         if (unitsLayer) {
//             unitsLayer.innerHTML = '';
//         }
//     }

//     /**
//      * Draws a single unit (army or fleet) on the map.
//      * @param {HTMLElement} parent The SVG parent element to append the unit to.
//      * @param {object} unit The unit object (e.g., { 'player': 'Miami', 'type': 'army' }).
//      * @param {object} position The {x, y} coordinates for the unit.
//      */
//     function drawUnit(parent, unit, position) {
//         let unitElement;
//         const colorClass = `player-${unit.player}`;
//         const size = 18;

//        if (unit.type === 'army') {
//             unitElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//             unitElement.setAttribute('cx', position.x);
//             unitElement.setAttribute('cy', position.y);
//             unitElement.setAttribute('r', size);
//             unitElement.classList.add('unit-army', colorClass);
//         } else if (unit.type === 'fleet') {
//             unitElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
//             const pathData = `M ${position.x} ${position.y + size} L ${position.x + size} ${position.y - size} L ${position.x - size} ${position.y - size} Z`;
//             unitElement.setAttribute('d', pathData);
//             unitElement.classList.add('unit-fleet', colorClass);
//         }

//         if (unitElement) {
//             parent.appendChild(unitElement);
//         }
//     }

//     /**
//      * Draws a visual arrow on the map to represent a move order.
//      * @param {object} startPos The {x, y} coordinates of the starting point.
//      * @param {object} endPos The {x, y} coordinates of the ending point.
//      */
//     function drawMoveArrow(startPos, endPos) {
//         // Remove any existing arrows first
//         const existingArrow = document.getElementById('move-arrow');
//         if (existingArrow) {
//             existingArrow.remove();
//         }

//         // Create a new SVG path element for the arrow
//         const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         arrow.setAttribute('id', 'move-arrow');
//         arrow.setAttribute('stroke', '#000000');
//         arrow.setAttribute('stroke-width', '3');
//         arrow.setAttribute('fill', 'none');
//         arrow.setAttribute('marker-end', 'url(#arrowhead)');

//         // Define the path for the line
//         const d = `M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`;
//         arrow.setAttribute('d', d);

//         // Append the arrow to the SVG
//         mapSvg.appendChild(arrow);
//     }
    
//     /**
//      * Draws a dashed circle around a unit to indicate a hold order.
//      * @param {object} position The {x, y} coordinates of the unit.
//      */
//     function drawHoldCircle(position) {
//         const existingCircle = document.getElementById('hold-circle');
//         if (existingCircle) {
//             existingCircle.remove();
//         }
        
//         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         circle.setAttribute('id', 'hold-circle');
//         circle.setAttribute('cx', position.x);
//         circle.setAttribute('cy', position.y);
//         circle.setAttribute('r', 25); // Radius larger than the unit
//         circle.setAttribute('stroke', '#000000');
//         circle.setAttribute('stroke-width', '2');
//         circle.setAttribute('fill', 'none');
//         circle.setAttribute('stroke-dasharray', '5,5');

//         mapSvg.appendChild(circle);
//     }


//     /**
//      * Creates the arrowhead marker for the SVG arrow.
//      */
//     function createArrowheadMarker() {
//         if (!mapSvg) return;

//         let defs = mapSvg.querySelector('defs');
//         if (!defs) {
//             defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
//             mapSvg.prepend(defs);
//         }

//         const existingMarker = defs.querySelector('#arrowhead');
//         if (existingMarker) existingMarker.remove();

//         const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
//         marker.setAttribute('id', 'arrowhead');
//         marker.setAttribute('viewBox', '0 0 10 10');
//         marker.setAttribute('refX', '8');
//         marker.setAttribute('refY', '5');
//         marker.setAttribute('markerWidth', '6');
//         marker.setAttribute('markerHeight', '6');
//         marker.setAttribute('orient', 'auto-start-reverse');
//         marker.setAttribute('markerUnits', 'strokeWidth');

//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
//         path.setAttribute('fill', '#000000');

//         marker.appendChild(path);
//         defs.appendChild(marker);
//     }


//     /**
//      * Clears all visual selection highlights from the map territories.
//      */
//     function clearMapSelections() {
//         territories.forEach(t => {
//             t.classList.remove('selected-origin', 'selected-destination', 'selected-support');
//         });
//     }

//     /**
//      * Resets the internal state for the current order being formed and clears map selections.
//      */
//     function resetCurrentOrderState() {
//         currentOrderState = {
//             origin: null,
//             destination: null,
//             supportTarget: null
//         };
//         clearMapSelections();
//         updateCurrentOrderDisplay(); // Update the info panel display

//         // Remove the arrow and the hold circle when the state is reset
//         const arrow = document.getElementById('move-arrow');
//         if (arrow) {
//             arrow.remove();
//         }
//         const holdCircle = document.getElementById('hold-circle');
//         if (holdCircle) {
//             holdCircle.remove();
//         }
//     }

//     /**
//      * Updates the text content of the current order display panel.
//      */
//     function updateCurrentOrderDisplay() {
//         displayOrigin.textContent = currentOrderState.origin ? currentOrderState.origin.id.toUpperCase() : 'None';
//         displayDestination.textContent = currentOrderState.destination ? currentOrderState.destination.id.toUpperCase() : 'None';
//         displaySupportTarget.textContent = currentOrderState.supportTarget ? currentOrderState.supportTarget.id.toUpperCase() : 'None';

//         displaySupportTarget.closest('p').style.display = currentOrderType === 'support' ? 'block' : 'none';
//     }

//     /**
//      * Updates the list of issued orders displayed on the page.
//      */
//     function updateOrdersList() {
//         ordersList.innerHTML = ''; // Clear existing list items
//         if (orders.length === 0) {
//             const li = document.createElement('li');
//             li.textContent = 'No orders issued yet.';
//             ordersList.appendChild(li);
//             return;
//         }
//         orders.forEach(order => {
//             const li = document.createElement('li');
//             let orderText = '';
//             if (order.type === 'move') {
//                 orderText = `${order.from.toUpperCase()} -> ${order.to.toUpperCase()}`;
//             } else if (order.type === 'hold') {
//                 orderText = `${order.from.toUpperCase()} Holds`;
//             } else if (order.type === 'support') {
//                 orderText = `${order.from.toUpperCase()} Supports ${order.supportedUnit.toUpperCase()} to ${order.supportedAction.toUpperCase()}`;
//             }
//             li.textContent = orderText;
//             ordersList.appendChild(li);
//         });
//     }

//     /**
//      * Sets the currently active order type and updates the UI accordingly.
//      * @param {string} type - The type of order to set ('move', 'hold', 'support').
//      */
//     function setActiveOrderType(type) {
//         currentOrderType = type;
//         resetCurrentOrderState(); // Clear any partial order when changing type

//         // Update active button styling
//         document.querySelectorAll('.order-type-btn').forEach(btn => {
//             btn.classList.remove('active-order-type');
//         });
//         document.getElementById(`${type}-btn`).classList.add('active-order-type');

//         // Update status message based on selected type
//         if (type === 'move') {
//             statusMessage.textContent = `Selected order 'type': Move. Select the unit's origin territory.`;
//         } else if (type === 'hold') {
//             statusMessage.textContent = `Selected order 'type': Hold. Select the unit's territory.`;
//         } else if (type === 'support') {
//             statusMessage.textContent = `Selected order 'type': Support. Select the supporting unit's territory.`;
//         }
//     }

//     // --- Event Listeners ---

//     // Initial setup when the page loads
//     setActiveOrderType('move'); // Set 'move' as the default order type
//     updateOrdersList(); // Display initial empty orders list

//     // Calculate the centers, create the arrowhead, and then render the units
//     calculateTerritoryCenters();
//     createArrowheadMarker();
//     renderUnits();

//     // Event listeners for order type buttons
//     moveBtn.addEventListener('click', () => setActiveOrderType('move'));
//     holdBtn.addEventListener('click', () => setActiveOrderType('hold'));
//     supportBtn.addEventListener('click', () => setActiveOrderType('support'));

//     // Event listener for clicks on map territories
//     territories.forEach(territory => {
//         territory.addEventListener('click', () => {
//             const clickedTerritoryId = territory.id;
//             const clickedTerritoryElement = territory;
//             const unitAtTerritory = getUnitByTerritoryId(clickedTerritoryId);

//             // Logic for issuing orders based on the current order type
//             if (currentOrderType === 'move') {
//                 if (!currentOrderState.origin) {
//                     // Step 1: Select the origin. Check if there's a unit there.
//                     if (unitAtTerritory) {
//                         currentOrderState.origin = clickedTerritoryElement;
//                         clickedTerritoryElement.classList.add('selected-origin');
//                         statusMessage.textContent = `Origin selected: ${clickedTerritoryId.toUpperCase()}. Now select the destination territory.`;
//                     } else {
//                         statusMessage.textContent = `Cannot move from ${clickedTerritoryId.toUpperCase()}. There is no unit there.`;
//                         resetCurrentOrderState();
//                     }
//                 } else if (!currentOrderState.destination && currentOrderState.origin.id !== clickedTerritoryId) {
//                     // Step 2: Select destination
//                     const originId = currentOrderState.origin.id;
//                     const destinationId = clickedTerritoryId;
                    
//                     // Check if the destination is adjacent to the origin
//                     if (adjacencies[originId] && adjacencies[originId].includes(destinationId)) {
//                          currentOrderState.destination = clickedTerritoryElement;
//                          clickedTerritoryElement.classList.add('selected-destination');

//                          // Draw the arrow now that both origin and destination are selected
//                          const startPos = territoryCenters[originId];
//                          const endPos = territoryCenters[destinationId];
//                          if (startPos && endPos) {
//                              drawMoveArrow(startPos, endPos);
//                          }

//                          const newOrder = {
//                              'type': 'move',
//                              from: originId,
//                              to: destinationId
//                          };
//                          orders.push(newOrder);
//                          updateOrdersList();
//                          statusMessage.textContent = `Move order issued: ${newOrder.from.toUpperCase()} -> ${newOrder.to.toUpperCase()}. Select a new origin or change order type.`;
    
//                          // Reset the temporary state so the user can start a new order
//                          resetCurrentOrderState();
//                     } else {
//                         // The move is not valid because the territories are not adjacent
//                         statusMessage.textContent = `${originId.toUpperCase()} is not adjacent to ${destinationId.toUpperCase()}. Please select a valid destination.`;
//                         // Reset the destination state but keep the origin to allow for another attempt
//                         currentOrderState.destination = null;
//                         clearMapSelections();
//                         currentOrderState.origin.classList.add('selected-origin'); // re-highlight the origin
//                         updateCurrentOrderDisplay();
//                     }

//                 } else if (currentOrderState.origin.id === clickedTerritoryId) {
//                     // Deselect
//                     resetCurrentOrderState();
//                     statusMessage.textContent = `Origin deselected. Select the unit's origin territory for a move order.`;
//                 }
//             } else if (currentOrderType === 'hold') {
//                 // Hold order only requires one click. Check if there's a unit there.
//                 if (unitAtTerritory) {
//                     const newOrder = {
//                         'type': 'hold',
//                         from: clickedTerritoryId
//                     };
//                     orders.push(newOrder);
//                     updateOrdersList();
//                     statusMessage.textContent = `Hold order issued: ${newOrder.from.toUpperCase()} Holds. Select another territory for a hold order or change order type.`;
                    
//                     const center = territoryCenters[clickedTerritoryId];
//                     if (center) {
//                          drawHoldCircle(center);
//                     }
                    
//                     // Reset the temporary state so the user can start a new order
//                     resetCurrentOrderState();

//                 } else {
//                     statusMessage.textContent = `Cannot hold. There is no unit at ${clickedTerritoryId.toUpperCase()}.`;
//                 }
//             } else if (currentOrderType === 'support') {
//                 if (!currentOrderState.origin) {
//                     // Step 1: Select supporting unit. Check if there's a unit there.
//                     if (unitAtTerritory) {
//                         currentOrderState.origin = clickedTerritoryElement;
//                         clickedTerritoryElement.classList.add('selected-origin');
//                         statusMessage.textContent = `Supporting unit selected: ${clickedTerritoryId.toUpperCase()}. Now select the unit being supported (their current territory).`;
//                     } else {
//                         statusMessage.textContent = `Cannot support from ${clickedTerritoryId.toUpperCase()}. There is no unit there.`;
//                         resetCurrentOrderState();
//                     }
//                 } else if (!currentOrderState.destination && currentOrderState.origin.id !== clickedTerritoryId) {
//                     // Step 2: Select the territory of the unit being supported
//                     const supportedUnit = getUnitByTerritoryId(clickedTerritoryId);
//                     if (supportedUnit) {
//                         currentOrderState.destination = clickedTerritoryElement;
//                         clickedTerritoryElement.classList.add('selected-destination');
//                         statusMessage.textContent = `Supported unit's territory: ${clickedTerritoryId.toUpperCase()}. Now select the territory they are moving to or holding (their action target).`;
//                     } else {
//                         statusMessage.textContent = `No unit found at ${clickedTerritoryId.toUpperCase()}. Please select a territory with a unit.`;
//                     }
//                 } else if (!currentOrderState.supportTarget && currentOrderState.origin.id !== clickedTerritoryId && currentOrderState.destination.id !== clickedTerritoryId) {
//                     // Step 3: Select the target territory of the supported unit's action
//                     currentOrderState.supportTarget = clickedTerritoryElement;
//                     clickedTerritoryElement.classList.add('selected-support');

//                     const newOrder = {
//                         'type': 'support',
//                         from: currentOrderState.origin.id,
//                         supportedUnit: currentOrderState.destination.id,
//                         supportedAction: currentOrderState.supportTarget.id
//                     };
//                     orders.push(newOrder);
//                     updateOrdersList();
//                     statusMessage.textContent = `Support order issued: ${newOrder.from.toUpperCase()} Supports ${newOrder.supportedUnit.toUpperCase()} to ${newOrder.supportedAction.toUpperCase()}. Select a new supporting unit or change order type.`;
//                     resetCurrentOrderState();
//                 } else {
//                     // Deselect or invalid click
//                     resetCurrentOrderState();
//                     statusMessage.textContent = `Selection reset. Select the supporting unit's territory for a support order.`;
//                 }
//             }
//             updateCurrentOrderDisplay();
//         });
//     });

//     // Event listener for the "Clear All Orders" button
//     clearButton.addEventListener('click', () => {
//         orders.length = 0;
//         resetCurrentOrderState();
//         updateOrdersList();
//         clearUnits();
//         renderUnits();
//         statusMessage.textContent = 'All orders cleared. Select an order type to begin.';
//     });

//     // Event listener for the "Process Turn" button
//     processTurnButton.addEventListener('click', () => {
//         if (orders.length === 0) {
//             console.warn('No orders have been issued to process the turn.');
//             statusMessage.textContent = 'No orders have been issued to process the turn.';
//             return;
//         }

//         // Process orders and update the game state
//         orders.forEach(order => {
//             if (order.type === 'move') {
//                 const unitToMove = units[order.from];
//                 const destinationUnit = getUnitByTerritoryId(order.to);
//                 const isAdjacent = adjacencies[order.from] && adjacencies[order.from].includes(order.to);

//                 // Add the new move validation rules
//                 let isMoveValid = true;
//                 if (!isAdjacent) {
//                     isMoveValid = false;
//                     console.log(`Move order from ${order.from.toUpperCase()} to ${order.to.toUpperCase()} failed: Territories are not adjacent.`);
//                 } else if (unitToMove.type === 'army' && fleetTerritories.includes(order.to)) {
//                     console.log(`Move order from ${order.from.toUpperCase()} to ${order.to.toUpperCase()} failed: Army cannot move into a fleet territory.`);
//                     isMoveValid = false;
//                 } else if (unitToMove.type === 'fleet' && armyTerritories.includes(order.to)) {
//                     console.log(`Move order from ${order.from.toUpperCase()} to ${order.to.toUpperCase()} failed: Fleet cannot move into a land territory.`);
//                     isMoveValid = false;
//                 }

//                 if (isMoveValid) {
//                     if (!destinationUnit) {
//                         // Only move the unit if the destination is empty
//                         if (unitToMove) {
//                             units[order.to] = unitToMove; // Place the unit in the new territory
//                             delete units[order.from]; // Remove the unit from the old territory
//                         }
//                     } else {
//                         console.log(`Move order from ${order.from.toUpperCase()} to ${order.to.toUpperCase()} failed: Destination is occupied.`);
//                     }
//                 }
//             } else if (order.type === 'hold') {
//                 // Log the hold order - no change to game state for now
//                 console.log(`Hold order issued: ${order.from.toUpperCase()} Holds`);
//             } else if (order.type === 'support') {
//                 // Log the support order - no change to game state for now
//                 console.log(`Support order issued: ${order.from.toUpperCase()} Supports ${order.supportedUnit.toUpperCase()} to ${order.supportedAction.toUpperCase()}`);
//             }
//         });

//         // After processing, clear and re-render the units on the map
//         clearUnits();
//         renderUnits();

//         console.log('Processing turn with the following orders:\n\n' + JSON.stringify(orders, null, 2));
//         statusMessage.textContent = 'Turn processed. All orders cleared and map updated. Check the console for full order processing details.';

//         orders.length = 0;
//         resetCurrentOrderState();
//         updateOrdersList();
//     });
// });

const trafficLightElms = document.querySelectorAll(".trafficLight"); /** 0 - red elem, 1 - yellow elem, 2 - green elem */
const GRAY_CLASS = "trafficLight-gray";
const RED_CLASS = "trafficLight-red";
const GREEN_CLASS = "trafficLight-green";
const YELLOW_CLASS = "trafficLight-yellow";
const allModifierClasses = [GRAY_CLASS, RED_CLASS, GREEN_CLASS, YELLOW_CLASS]
const statesMachine = [
  { timing: 2,stateArr: [{ index: 0, CSSclass: RED_CLASS },{ index: 1, CSSclass: YELLOW_CLASS }]},
  { timing: 2, stateArr: [{ index: 2, CSSclass: GREEN_CLASS }] },
  { timing: 2, stateArr: [{ index: 1, CSSclass: YELLOW_CLASS }] },
  { timing: 2, stateArr: [{ index: 0, CSSclass: RED_CLASS }] },
];

/**
 * Processes a single state in the state machine:
 * 1. Waits for a duration.
 * 2. Resets lights.
 * 3. Applies new state.
 * 
 * @param {{timing: number, stateArr: Array<{index: number, CSSclass: string}>}} param0 - State definition with timing and light configuration.
 */
async function stateProcessing({ timing, stateArr }) {
  await sleep(timing);
  grayOutTrafficLightElements();
  setStateClasses(stateArr);
}

/**
 * Applies active color classes to traffic light elements based on state.
 * 
 * @param {Array<{index: number, CSSclass: string}>} stateArr - Array of objects defining which element to color and which class to apply.
 */
function setStateClasses(stateArr){
    stateArr.forEach(({index, CSSclass}) => {
        trafficLightElms[index].classList.replace(GRAY_CLASS, CSSclass);
    })
}

/**
 * Resets all traffic light elements to the gray (off) state.
 * Removes any active modifier classes (red, yellow, green).
 */
function grayOutTrafficLightElements() {
    trafficLightElms.forEach(e => {
        e.classList.remove(...allModifierClasses)
        e.classList.add(GRAY_CLASS);
    });

}

/**
 * Runs through one full cycle of the traffic light state machine.
 */
async function oneIteration() {
    for(let i = 0; i < statesMachine.length; i++) {
        await stateProcessing(statesMachine[i])
    }
  }

/**
 * Continuously loops through the state machine to simulate a working traffic light.
 */  
(async () => {
    while(true) {
       await oneIteration(); 
    }
    
})();

/**
 * Pauses execution for a specified amount of seconds.
 * 
 * @param {number} timing - Time to wait in seconds.
 * @returns {Promise<void>} Promise that resolves after the delay.
 */
function sleep(timing) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timing * 1000);
  });
}
import { createScreen } from "../screens/createScreen";
import {createStartScreenContent, START_SCREEN_CLASS} from "./StartScreen";
import { createGameOverScreenContent, GAME_OVER_SCREEN_CLASS } from "./GameOverScreen";
import { createCreditScreenContent, CREDIT_SCREEN_CLASS } from "./CreditScreen";

export {
    getScreens
}

function getScreens(startScreenHandles, gameOverScreenHandles, creditScreenHandles) {
    const backgroundColor = `rgba(46, 45, 45, .95)`
    
    const startScreenContent = createStartScreenContent(startScreenHandles);
    const startScreen = createScreen(START_SCREEN_CLASS, startScreenContent);

    const gameOverScreenContent = createGameOverScreenContent(gameOverScreenHandles);
    const gameOverScreen = createScreen(GAME_OVER_SCREEN_CLASS, gameOverScreenContent, backgroundColor);

    const creditScreenContent = createCreditScreenContent(creditScreenHandles);
    const creditScreen = createScreen(CREDIT_SCREEN_CLASS, creditScreenContent, backgroundColor);

    return {
        startScreen,
        gameOverScreen,
        creditScreen
    }
}
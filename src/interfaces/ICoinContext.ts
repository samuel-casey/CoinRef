import { GStateInterface } from "./IGState";

import IGState from "./IGState";

export default interface ICoinContext {
    gState: IGState;
    setGState(): void;
}
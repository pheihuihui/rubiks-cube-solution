import { TRotationDirection } from "./model/Cubie";
import { getSolution } from "./solution/solve";
import { TSteps } from "./solution/utils";

interface IMessageMap {
    cube: string
    solution: TSteps
}

export type TMessageEventArgs<T extends keyof IMessageMap> = { messageType: T, content: IMessageMap[T] }

onmessage = function (e: MessageEvent<TMessageEventArgs<'cube'>>) {
    if (e.data?.messageType == 'cube') {
        let res = getSolution(e.data.content)
        let ret: TMessageEventArgs<'solution'> = {
            messageType: 'solution', content: {
                // TODO
                Phase1: res.splice(res.length / 2) as TRotationDirection[],
                Phase2: res as TRotationDirection[]
            }
        }
        postMessage(ret)
    }
}


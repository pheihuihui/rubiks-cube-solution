import { TSteps } from "./solution/Solution";
import { __getSolution } from "./solution/tmp";

interface IMessageMap {
    cube: string
    solution: TSteps
}

export type TMessageEventArgs<T extends keyof IMessageMap> = { messageType: T, content: IMessageMap[T] }

onmessage = function (e: MessageEvent<TMessageEventArgs<'cube'>>) {
    if (e.data?.messageType == 'cube') {
        let res = __getSolution(e.data.content)
        let ret: TMessageEventArgs<'solution'> = { messageType: 'solution', content: res }
        postMessage(ret)
    }
}



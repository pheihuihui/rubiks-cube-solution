import { getSolution } from "./solution/solve";

interface IMessageMap {
    cube: string
    solution: string[]
}

export type TMessageEventArgs<T extends keyof IMessageMap> = { messageType: T, content: IMessageMap[T] }

onmessage = function (e: MessageEvent<TMessageEventArgs<'cube'>>) {
    if (e.data?.messageType == 'cube') {
        let res = getSolution(e.data.content)
        let ret: TMessageEventArgs<'solution'> = { messageType: 'solution', content: res }
        postMessage(ret)
    }
}


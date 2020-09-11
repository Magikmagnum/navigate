import { useState, useRef, useCallback } from "react";
import { interpret } from "robot3";

export function useMachine(machine, initialContext) {

    const { current: service } = useRef(
        interpret(
            machine, () => {
                setState(service.machine.current);
                setContext(service.context);
            },
            initialContext
        )
    );

    const [state, setState] = useState(service.machine.current);
    const [context, setContext] = useState(service.context);

    const send = useCallback(function (type, params = {}) {
        service.send({ type: type, ...params })
    }, [service]);

    const can = useCallback(
        (transitionName) => {
            const transitions = service.machine.state.value.transitions;
            if (!transitions.has(transitionName)) {
                return false;
            }
            const transitionsForName = transitions.get(transitionName);
            for (const t of transitionsForName) {
                if (!t.guards || (t.guards && t.guards(service.context))) {
                    return true;
                }
            }
            return false;

        }, [service.context, service.machine.state.value.transitions]
    );

    return [state, context, send, can];
}
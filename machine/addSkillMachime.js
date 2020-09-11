// Creation of machine states

import { createMachine, interpret, state, transition, invoke, reduce, guard } from 'robot3'

export default createMachine(
    "edit",
    {
        idle: state(
            transition("edit", "edit")
        ),
        edit: state(
            transition("cancel", "idle"),
            transition("input", "edit", reduce((ctx, ev) => ({ ...ctx, editedTitle: ev.value }))),
            transition("submit", "loading", guard((ctx) => ctx.editedTitle && ctx.editedTitle !== ctx.title)),
        ),
        loading: invoke(
            () => wait(2000),
            transition('done', 'success'),
            transition('error', 'edit')
        ),
        success: state(),
    }, () => ({ title: "Hello" })
);

const wait = (duration) => {
    return new Promise(resolve => {
        window.setTimeout(function (params) {
            resolve()
        }, duration)
    })
}
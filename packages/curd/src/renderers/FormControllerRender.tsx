import {FormItemType, StdTableColumn} from "../types";
import {isFunction, isPlainObject} from "../utils/util";
import {get} from "lodash-es";
import getInternalFormController from "../components/StdFormControllers";
import {inject, Reactive} from "vue";
import {i18n} from "../i18n";

export function FormControllerRender(p: {
    searchApi?: any,
    formData: Reactive<Record<string, any>>,
    column: StdTableColumn,
    lang: string,
    formItemKey: string
}) {
    const { dataIndex } = p.column
    const formItem = p.column[p.formItemKey ?? 'edit']

    placeholderHelper(p.column, formItem)

    if (isFunction(formItem?.type)) {
        // Support custom render function
        return formItem?.type(p.formData, p.column)
    } else if (isPlainObject('object') && formItem?.type?.name) {
        // Support custom component, but need to pass column to component and define model for it
         return (
            <formItem.type
                modelValue={get(p.formData.value, formItem?.formItem?.name ?? dataIndex)}
                column={p.column}
            />
        )
    } else {
        return getInternalFormController(p.formData, formItem, dataIndex, p.lang)
    }
}


function placeholderHelper(column: StdTableColumn, formItem?: FormItemType) {
    const type = formItem?.type
    if (!formItem || formItem?.[type]?.placeholder) return

    const lang = inject('lang', 'zh-cn')
    const isInputType = type === 'input' || type === 'input-number'
    if (!formItem?.[type]) {
        formItem[type] = {}
    }
    const fieldName = formItem?.formItem?.name ?? column.title ?? column.dataIndex
    formItem[type].placeholder = `${i18n[lang].please}${i18n[lang][isInputType ? 'input' : 'select']}${fieldName}`
}
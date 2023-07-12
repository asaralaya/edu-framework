// tslint:disable-next-line: no-namespace
export namespace NSFramework {

    export type TCardSubType =
        | 'standard'
        | 'minimal'
        | 'space-saving'

    export interface ICategory {
        identifier?: string
        name?: string
        description?: string
        code: string
        translations?: any
        index: number
        terms: any[]
    }

    export interface ITermCard {
        children: any
        cardSubType: TCardSubType
        deletedMode?: 'greyOut' | 'hide'
        stateData?: any
        selected?: boolean
        category: string
        isViewOnly?: boolean,
        highlight?: boolean
    }




    export interface IFrameworkView {
        identifier: string
        code: string
        name: string
        description: string
        children: []
        parent?: any
    }
    export interface IColumnView {
        identifier: string
        name: string
        selected: boolean
        description?: string
        code: string
        translations?: any
        index: number
        children: any[],
        category: string,
        associations: string,
    }
}






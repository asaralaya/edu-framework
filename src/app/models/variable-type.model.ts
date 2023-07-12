export interface Card {
    approvalStatus?: string,
    associations?: Array<Card>,
    identifier?: string,
    code?: string,
    translations?: any,
    name?: string,
    description?: string,
    index?: number,
    category?: string,
    status?: string,
    icon?: string,
    color?: string,
    children?: Array<Card>,
    highlight?: boolean,
    
    selected?: boolean,
    parents?: any
}

export interface  CardSelection {
    element?: Array<Card>,
    selectedTerm?: Array<Card>,
    isSelected: boolean
}

export interface CardChecked {
    term: Card,
    checked: boolean
}
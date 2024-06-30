type CurrencySymbols = "$" | "€" | "£"

export const Currencies: { name: string; sign: CurrencySymbols }[] = [
    {
        name: "USD",
        sign: "$"
    },
    {
        name: "EUR",
        sign: "€"
    },
    {
        name: "GBP",
        sign: "£"
    }
]

export type UUID = `${string}-${string}-${'4'}${string}-${string}-${string}`;

export type Subscription = {
    id: UUID;
    name: string;
    cost: string;
    currency: CurrencySymbols;
    startDate: Date;
    everyWeeks: string;
    notes: string;
}
import { Category } from "./Category.type";
import { Interval } from "./Interval.type";

export enum SubscriptionStatus {
    active = 'active',
    stopped = 'stopped',
    paused = 'paused',
}

export type Subscription = {
    id: string;
    title: string;
    amount: number;
    category: Category;
    created: Date;
    start: Date;
    status: SubscriptionStatus;
    every: number;
    interval: Interval;
    end?: Date;
    history: SubscriptionHistory[];
}

// Let's keep it in ideation for now
type SubscriptionHistory = {
    id: string;
    subscription: Subscription["id"];
    history: {
        amount: Subscription["amount"]
        status: Subscription["start"];
        when: Date;
        reason?: string;
    }[]
}
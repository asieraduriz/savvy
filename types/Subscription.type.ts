import { Interval } from "./Interval.type";

enum SubscriptionStatus {
    active = 'active',
    stopped = 'stopped',
    paused = 'paused',
}

export type Subscription = {
    id: string;
    every: number;
    interval: Interval;
    status: SubscriptionStatus;
    start: Date;
    end?: Date;
}

// Let's keep it in ideation for now
type SubscriptionHistory = {
    id: string;
    subscription: Subscription["id"];
    history: {
        from: SubscriptionStatus;
        to: SubscriptionStatus;
        when: Date;
        reason?: string;
    }[]
}
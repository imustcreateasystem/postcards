export type UserWeek = {
  slotsUsed: number;
  totalSlots: number;
  streak: number;
  weekLabel: string;
};

const userWeek: UserWeek = {
  slotsUsed: 2,
  totalSlots: 5,
  streak: 6,
  weekLabel: "Apr 21",
};

export async function getUserWeek(): Promise<UserWeek> {
  return userWeek;
}

export async function incrementSlotsUsed(): Promise<UserWeek> {
  if (userWeek.slotsUsed < userWeek.totalSlots) {
    userWeek.slotsUsed += 1;
  }
  return userWeek;
}

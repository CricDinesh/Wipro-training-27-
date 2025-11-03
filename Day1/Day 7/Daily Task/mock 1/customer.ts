
export interface IUser {
  id: number;
  fullName: string;
  emailAddress: string;
}

export class User implements IUser {
  id: number;
  fullName: string;
  emailAddress: string;

  constructor(id: number, fullName: string, emailAddress: string) {
    this.id = id;
    this.fullName = fullName;
    this.emailAddress = emailAddress;
  }

  getProfile(): string {
    return `${this.fullName} (${this.emailAddress})`;
  }
}

export function sampleUsers(): User[] {
  const user1 = new User(1, 'Rahul Mehta', 'rahul.mehta@example.com');
  const user2 = new User(2, 'Sneha Kapoor', 'sneha.kapoor@example.com');
  return [user1, user2];
}

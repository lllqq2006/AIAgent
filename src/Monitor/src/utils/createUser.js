export function createUser(phone, name, role, userId, dept) {
  return {
    phone,
    name,
    role,
    userId,
    dept,
    score: 85,
    reports: 5,
    courses: 3,
    rank: 12,
    level: 3,
    avatar: null,
    createTime: new Date().toISOString(),
  }
}

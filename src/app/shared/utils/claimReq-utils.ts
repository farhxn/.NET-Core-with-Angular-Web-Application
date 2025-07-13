export const claimReq = {
  adminOnly: (c: any) => c.role === 'Admin',
  adminOrTeacherOnly: (c: any) => c.role === 'Admin' || c.role === 'Teacher',
  MatenarityLeave: (c: any) => c.role === 'Teacher' && c.gender === 'Female',
  HasLibraryId: (c: any) => 'libraryID' in c,
  femaleBelow10: (c:any)=> c.gender === "Female" && parseInt(c.age)<10
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function () {
  let users = await prisma.absenceUser.findMany();
  for (const user of users) {
    if (user.until || user.until !== "") {
      let now = Math.round(new Date().getTime() / 1000);
      if (Math.round(parseInt(user.until) - now) < 0) {
        try {
          await prisma.absenceUser.update({
            where: {
              id: user.id,
            },
            data: {
              status: 0,
              until: "",
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};

import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Generate your dates using: https://lanceyrj.github.io/contirbute-calendar/
const makeCommits = async () => {
  const startDate = moment("2024-05-26");
  const endDate = moment("2025-04-11");
  const days = endDate.diff(startDate, "days") + 1;

  console.log(`Starting commits for ${startDate.format("YYYY-MM-DD")} to ${endDate.format("YYYY-MM-DD")}`);

  try {
    for (let i = 0; i < days; i++) {
      const currentDate = moment(startDate).add(i, "days");
      const formattedDate = currentDate.format("YYYY-MM-DD HH:mm:ss");
      const data = { date: formattedDate };

      console.log(`\nProcessing date: ${currentDate.format("YYYY-MM-DD")}`);

      const commitsPerDay = random.int(1, 5);
      console.log(`Making ${commitsPerDay} commits for this day`);

      for (let j = 0; j < commitsPerDay; j++) {
        console.log(`- Making commit ${j + 1}/${commitsPerDay}`);
        jsonfile.writeFileSync(path, data);
        await git.add([path]);
        await git.commit(`commit for ${formattedDate}`, {
          "--date": `"${formattedDate}"`,
        });
      }
    }

    console.log("\nPushing all commits to repository...");
    await git.push();
    console.log("✅ All commits have been pushed successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

makeCommits().then(() => {
  console.log("Script completed");
});

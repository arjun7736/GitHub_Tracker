const readline = require("readline");
const axios = require("axios");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionAsync = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const handleEvent = (event) => {
  const repoName = event.repo.name;
  switch (event.type) {
    case "CommitCommentEvent":
      return `New commit comment to ${repoName}`;
    case "CreateEvent":
      return `New repository ${repoName} created`;
    case "DeleteEvent":
      return `Repository ${repoName} deleted`;
    case "DeploymentEvent":
      return `New deployment to ${repoName} with status ${event.payload.deployment.state}`;
    case "DeploymentStatusEvent":
      return `New deployment status for ${repoName} with status ${event.payload.deployment.state}`;
    case "ForkEvent":
      return `New fork of ${repoName} by ${event.actor.login}`;
    case "GistEvent":
      return `New gist created by ${event.actor.login}`;
    case "IssueCommentEvent":
      return `New issue comment on ${repoName}`;
    case "IssuesEvent":
      return `New issue on ${repoName}`;
    case "LabelEvent":
      return `New label on ${repoName}`;
    case "MembershipEvent":
      return `New membership on ${repoName}`;
    case "MilestoneEvent":
      return `New milestone on ${repoName}`;
    case "PageEvent":
      return `New page on ${repoName}`;
    case "ProjectEvent":
      return `New project on ${repoName}`;
    case "PullRequestEvent":
      return `New pull request on ${repoName}`;
    case "PullRequestReviewEvent":
      return `New pull request review on ${repoName}`;
    case "PullRequestReviewCommentEvent":
      return `New pull request review comment on ${repoName}`;
    case "PushEvent":
      return `New commit to ${repoName} with message: ${event.payload.commits[0].message}`;
    case "ReleaseEvent":
      return `New release on ${repoName} with tag: ${event.payload.release.tag_name}`;
    case "RepositoryEvent":
      return `New repository ${repoName} created`;
    case "StarEvent":
      return `New star on ${repoName}`;
    case "UnstarEvent":
      return `New unstar on ${repoName}`;
    case "WatchEvent":
      return `New watch on ${repoName}`;
    case "WorkflowDispatchEvent":
      return `New workflow dispatch on ${repoName}`;
    case "WorkflowRunEvent":
      return `New workflow run on ${repoName}`;
    default:
      return null; 
  }
};

const fetchData = async (username) => {
  const endPoint = `https://api.github.com/users/${username}/events`;
  try {
    const response = await axios.get(endPoint);
    const data = response.data;

    if (data.length === 0) {
      console.log("No data found for the given username.");
      rl.close()
    }

    console.log(`Hello ${username}!`);
    data.forEach((event) => {
      const message = handleEvent(event);
      if (message) {
        console.log(message);
      }
    });
  } catch (error) {
    console.error("Error fetching data Username is Invalied ");
  } finally {
    rl.close(); 
  }
};

const fetchUsername = async () => {
  const question = "Please enter your GitHub username: ";
  const username = await questionAsync(question);
  await fetchData(username);
};

fetchUsername();

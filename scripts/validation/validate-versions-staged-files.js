const { join, dirname } = require("path");
const { promisify } = require("util");
const { exec, spawn } = require("child_process");

const execAsync = promisify(exec);

const precommit = async () => {
    console.log(process.cwd());

    const lernaPackages = execAsync("npm lerna ls --json --all");
    const stagedFiles = execAsync("git diff --staged --name-only");
    // const [{ stdout: ls }, { stdout: diff }] = await Promise.all([lernaPackages, stagedFiles]);
    const packages = JSON.parse((await lernaPackages).stdout.trim());
    const staged = (await stagedFiles).stdout.trim().split("\n");

    // const scopes = packages
    //     .filter(p => staged.some(f => dirname(join(process.cwd(), f)).includes(p.location)))
    //     .map(({ name }) => ["--scope", name]);

    // if (scopes.length > 0)
    //     spawn("npm", ["lerna", "run", "--concurrency", "1", "--stream", "precommit", ...[].concat(...scopes)], {
    //         stdio: "inherit"
    //     });
};

precommit();

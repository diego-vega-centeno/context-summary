export async function fetchPRIssuesTimeline(
  owner: string,
  repo: string,
  number: number,
) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${number}/timeline`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`);

  return res.json();
}

export async function fetchPRPulls(
  owner: string,
  repo: string,
  number: number,
) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} - ${res.statusText}`);

  return res.json();
}

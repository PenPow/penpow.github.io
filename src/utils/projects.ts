import { Octokit } from "octokit";
import type { LocalProject, RemoteProject } from "@site-config";
import { languageColours, type Language } from "@utils/languages";

const octokit = new Octokit({ 
	auth: import.meta.env.GITHUB_PAT,
	timeZone: "Europe/London",
});

const request = await octokit.rest.repos.listForAuthenticatedUser({
	per_page: 100
}).catch((err) => ({ status: err.status ?? 500, data: null }));

if(request.status !== 200 && import.meta.env.DEV) throw new Error(`Failed to fetch github repositories, recieved code ${request.status}`);

const repos = request.data

export function fetchRemoteProject(project: RemoteProject): LocalProject | null | undefined {
	if(repos === null) return undefined;

	const repo = repos.find(repository => repository.full_name === project.repo);
	if(!repo) return null;

	return {
		name: repo.full_name,
		description: repo.description ?? "",
		language: Object.keys(languageColours).includes(repo.language ?? "") ? repo.language! as Language : 'Unknown',
		url: repo.visibility === "private" ? undefined : repo.html_url,
		icon: repo.owner.avatar_url,
		...project,
		type: "local",
	}
}
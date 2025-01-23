// import { Octokit } from '@octokit/rest';
// import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
// import * as dotenv from 'dotenv';

// type UserResponse = RestEndpointMethodTypes["users"]["getByUsername"]["response"];
// type ReposResponse = RestEndpointMethodTypes["repos"]["listForUser"]["response"];
// type CommitsResponse = RestEndpointMethodTypes["repos"]["listCommits"]["response"];

// class GitHubService {
//   private static instance: GitHubService;
//   public readonly octokit: Octokit;
//   private readonly MAX_RETRIES = 3;
//   private readonly RETRY_DELAY = 1000; // 1 second

//   private constructor() {
//     const token = "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";
//     console.log('GitHub token:', token); // Add this line to verify the token
//     if (!token) {
//       console.error('GitHub token is not set in environment variables');
//       throw new Error('GitHub token is not set in environment variables');
//     }
//     this.octokit = new Octokit({
//       auth: token,
//     });
//   }

//   public static getInstance(): GitHubService {
//     if (!GitHubService.instance) {
//       GitHubService.instance = new GitHubService();
//     }
//     return GitHubService.instance;
//   }

//   private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
//     let lastError: Error | null = null;
//     for (let i = 0; i < this.MAX_RETRIES; i++) {
//       try {
//         return await operation();
//       } catch (error: any) {
//         console.error('GitHub API error:', error);
//         lastError = error;
//         if (error.status === 403) {
//           // Rate limit exceeded, wait longer
//           await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * Math.pow(2, i)));
//         } else {
//           throw error;
//         }
//       }
//     }
//     throw lastError;
//   }

//   async getUserData(username: string): Promise<UserResponse> {
//     console.log('Fetching user data for:', username); // Add this line to verify the username
//     const data = await this.retryOperation(() => 
//       this.octokit.users.getByUsername({ username:"kalyanbathula" })
//     );
//     console.log('User Data:', data); // Add this line to verify the response
//     return data;
//   }

//   async getRepositories(username: string = 'kalyanbathula', options: any = {}): Promise<ReposResponse> {
//     console.log('Fetching repositories for:', username); // Add this line to verify the username
//     const data = await this.retryOperation(() => 
//       this.octokit.repos.listForUser({ 
//         username: 'kalyanbathula', // Hardcoded username
//         per_page: 100, 
//         sort: 'updated', 
//         type: 'all', 
//         ...options 
//       })
//     );
//     console.log('Repositories Data:', data); // Add this line to verify the response
//     return data;
// }

//   async getRepositoryCommits(owner: string, repo: string, options: any = {}): Promise<CommitsResponse> {
//     console.log('Fetching commits for:', owner, repo); // Add this line to verify the owner and repo
//     const data = await this.retryOperation(() => 
//       this.octokit.repos.listCommits({ owner, repo, ...options })
//     );
//     console.log('Commits Data:', data); // Add this line to verify the response
//     return data;
//   }


//   async isTokenValid(): Promise<boolean> {
//     console.log('isTokenValid method called'); // Add this line
//     try {
//       const response = await this.octokit.users.getAuthenticated();
//       console.log(response);
//       console.log('GitHub Authentication Success:', response.data.login);
//       return true;
//     } catch (error) {
//       console.error('GitHub token validation error:', error);
//       return false;
//     }
//   }
// }

// export const githubService = GitHubService.getInstance();





import { Octokit } from '@octokit/rest';
import type { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

type UserResponse = RestEndpointMethodTypes["users"]["getByUsername"]["response"];
type ReposResponse = RestEndpointMethodTypes["repos"]["listForUser"]["response"];
type CommitsResponse = RestEndpointMethodTypes["repos"]["listCommits"]["response"];

class GitHubService {
  private static instance: GitHubService;
  public readonly octokit: Octokit;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second
  private cache: { [key: string]: any } = {}; // Cache object

  private constructor() {
    const token = "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";
    console.log('GitHub token:', token); // Add this line to verify the token
    if (!token) {
      console.error('GitHub token is not set in environment variables');
      throw new Error('GitHub token is not set in environment variables');
    }
    this.octokit = new Octokit({
      auth: token,
    });
  }

  public static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;
    for (let i = 0; i < this.MAX_RETRIES; i++) {
      try {
        return await operation();
      } catch (error: any) {
        console.error('GitHub API error:', error);
        lastError = error;
        if (error.status === 403) {
          // Rate limit exceeded, wait longer
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * Math.pow(2, i)));
        } else {
          throw error;
        }
      }
    }
    throw lastError;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache[key];
    if (cached && (Date.now() - cached.timestamp < 3600000)) { // Cache for 1 hour
      return cached.data;
    }
    return null;
  }

  private setCachedData<T>(key: string, data: T): void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
  }

  async getUserData(username: string): Promise<UserResponse> {
    const cacheKey = `user_${username}`;
    const cachedData = this.getCachedData<UserResponse>(cacheKey);
    if (cachedData) {
      console.log('Returning cached user data for:', username);
      return cachedData;
    }

    console.log('Fetching user data for:', username); // Add this line to verify the username
    const data = await this.retryOperation(() => 
      this.octokit.users.getByUsername({ username })
    );
    console.log('User Data:', data); // Add this line to verify the response
    this.setCachedData(cacheKey, data);
    return data;
  }

  async getRepositories(username: string = 'kalyanbathula', options: any = {}): Promise<ReposResponse> {
    const cacheKey = `repos_${username}`;
    const cachedData = this.getCachedData<ReposResponse>(cacheKey);
    if (cachedData) {
      console.log('Returning cached repositories data for:', username);
      return cachedData;
    }

    console.log('Fetching repositories for:', username); // Add this line to verify the username
    const data = await this.retryOperation(() => 
      this.octokit.repos.listForUser({ 
        username: 'kalyanbathula', // Hardcoded username
        per_page: 100, 
        sort: 'updated', 
        type: 'all', 
        ...options 
      })
    );
    console.log('Repositories Data:', data); // Add this line to verify the response
    this.setCachedData(cacheKey, data);
    return data;
  }

  async getRepositoryCommits(owner: string, repo: string, options: any = {}): Promise<CommitsResponse> {
    const cacheKey = `commits_${owner}_${repo}`;
    const cachedData = this.getCachedData<CommitsResponse>(cacheKey);
    if (cachedData) {
      console.log('Returning cached commits data for:', owner, repo);
      return cachedData;
    }

    console.log('Fetching commits for:', owner, repo); // Add this line to verify the owner and repo
    const data = await this.retryOperation(() => 
      this.octokit.repos.listCommits({ owner, repo, ...options })
    );
    console.log('Commits Data:', data); // Add this line to verify the response
    this.setCachedData(cacheKey, data);
    return data;
  }

  async isTokenValid(): Promise<boolean> {
    console.log('isTokenValid method called'); // Add this line
    try {
      const response = await this.octokit.users.getAuthenticated();
      console.log(response);
      console.log('GitHub Authentication Success:', response.data.login);
      return true;
    } catch (error) {
      console.error('GitHub token validation error:', error);
      return false;
    }
  }
}

export const githubService = GitHubService.getInstance();
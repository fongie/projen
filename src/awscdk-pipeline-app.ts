import { AwsCdkTypeScriptApp, AwsCdkTypeScriptAppOptions } from './awscdk-app-ts';

export interface AwsCdkPipelineAppOptions extends AwsCdkTypeScriptAppOptions {
  /**
     * The account in which the CDK Pipeline stack should be deployed.
   * @default "111111111111"
     */
  readonly cdkPipelineAccount: string;
  /**
     * The region to which the CDK Pipeline stack should be deployed.
     * @default "us-west-1"
     */
  readonly cdkPipelineRegion: string;
  /**
     * The name of the CDK Pipeline
     * @default - no name is specified
     */
  readonly cdkPipelineName?: string;
  /**
     * The name of a secretmanager secret containing a github personal access token as a plaintext secret
     * @default github-token
     */
  readonly githubTokenSecretName?: string;
}

/**
 * An AWS CDK App self-deployed by a CDK Pipeline
 * 
 * @pjid awscdk-pipeline-app
 */
export class AwsCdkPipelineApp extends AwsCdkTypeScriptApp {

  constructor(options: AwsCdkPipelineAppOptions) {
    super({
      ...options,
    });

    this.addCdkDependency('@aws-cdk/pipelines');
    this.cdkConfig.context = {
      ...this.cdkConfig.context,
      '@aws-cdk/core:newStyleStackSynthesis': true,
    };
  }

  // must specify this in context.json:
  // "context": {
  //     "@aws-cdk/core:newStyleStackSynthesis": true
  //   }
}

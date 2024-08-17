import fs from 'fs';
import path from 'path';
import { humanId } from 'human-id';
import { PVM_BASE_PATH } from '../../../constants/globals.js';
import { logger } from '../../../utils/logger/logger.js';

const template = `---
"{{packageName}}": {{semverLevel}}
---

{{commitMessage}}
`;

type inquireSemverProps = {
  packageName: string;
  semverLevel: string;
  commitMessage: string;
};

async function createNewMdFile(props: inquireSemverProps) {
  let filenameWithExtension = 'no-name';

  try {
    const { packageName, semverLevel, commitMessage } = props;

    const filename = humanId({ separator: '-', capitalize: false });
    filenameWithExtension = `${filename}.md`;

    const newMdContents = template
      .replace('{{packageName}}', packageName)
      .replace('{{semverLevel}}', semverLevel)
      .replace('{{commitMessage}}', commitMessage);

    const filenameFullPath = path.resolve(PVM_BASE_PATH, filenameWithExtension);

    fs.writeFileSync(filenameFullPath, newMdContents);

    return filenameWithExtension;
  } catch (error) {
    logger.error(`Failed to create file '${filenameWithExtension}'...`);

    throw error;
  }
}

export { createNewMdFile };

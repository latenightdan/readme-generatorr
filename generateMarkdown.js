// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string


// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = license => {
  const badgeArr = license.badges.map(({ link }) => {
    console.log(link);
    return ` ### ${link}`;
  });

  return `${badgeArr.join('')}`
};




// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  const lc = license.license;
  if (!lc) {


    return ``;

  }

  return `## Licenses:`

}

// TODO: Create a function to generate markdown for README

const renderLicenseBadge = license => {
  const badgeArr = license.badges.map(({ badge, about, color, link }) => {
    console.log(badge);
    const dummyString = about.replace(/\s+/g, '-');
    
    return `[![License](https://img.shields.io/badge/${badge}-${dummyString}-${color})](${link})`;
  });

  return `${badgeArr.join(' ')}`
};

module.exports = data => {
  console.log(data);
  const { title, description, installation, usage, contribution, test, ...body } = data
  return `
# ${data.title}

 ## Description 
   ${data.description}

 ## Installation 
    ${data.installation}

## Usage 
    ${data.usage}

## Contributions 
    ${data.contribution}
    
## Test App 
     ${data.test}
${renderLicenseSection(data)}

${renderLicenseBadge(data)}
     
${renderLicenseLink(data)}
`;
}

// module.exports = renderLicenseBadge;
# Internationalization

Setup i18n/l12n for React app using [i18-next](https://www.i18next.com/) and [react-18next](https://react.i18next.com/)

## Prerequisites

[ ] [Set up database](https://microstrategy.atlassian.net/wiki/spaces/DevOps/pages/813565969/Guideline+for+String+Localization+Process) for your repo in Tech/PRODUCTSTRINGS
[ ] Replace placeholder translation files in Strings folder with actual files

## Strings

The [Strings folder](./strings) will contains the unzipped folder from Nexus that is stored in the PRODUCTSTRINGS repo. The structure of the translation files contains key-value pairs stored in a JSON object like so: 
```
{
  key1: value1,
  key2: value2
} 
```
where every pair is on a new line.

### Updating Strings

1. Create a PR to Tech/PRODUCTSTRINGS.
2. Download .zip file for your repo from Nexus.
3. Replace 'Strings' folder COMPLETELY with the new unzipped folder.
4. Submit a PR to your repo to update the strings.

## Usage

### useTranslation hook

Use with functional components:

```
import { useTranslation } from 'react-i18next'

const ComponentName = () => {
  const { t, i18n } = useTranslation('namespace')
  t('key', 'fallback value')
}
```

### withTranslation HOC 

Use with traditional Class components:

```
import { withTranslation } from 'react-i18next'

class ComponentName {
  const { t , i18n } = this.props
  t('key', 'fallback value')
}

// Use withTranslation() in the , not in the connect() function
export default connect(...)(withTranslation('namespace')(ComponentName))
```

## Fallbacks

The fallback language is set to **'en'**; this is done when i18n is initialized in [i18n.js](./i18n.js) file. 

### Missing Key

Keys are NOT stored in natural language. This means that if a key is not found in the translation files, the key itself will be used as the translation.

Therefore, it is good practice to always specify a fallback value like so:

```
 t('newQualification', 'New Qualification')
```

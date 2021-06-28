import chrome from 'ui/chrome';
const searchbarClass = 'kuiLocalSearchAssistedInput';

const hideSearchBar = async () => {
  const response = await fetch(chrome.addBasePath('/api/v1/auth/authinfo'), {
    method: 'GET',
  });

  const info = await response.json();

  if (info.roles.find(r => r === 'kibana_read_only')) {
    // if user has 'kibana_read_only' role, hide search bar
    const css = `.${searchbarClass} { display: none !important; }`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    console.log('searchbar hidden');
  }
};

hideSearchBar();

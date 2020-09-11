import { atom } from "recoil";

export const themeState = atom({
    key: 'theme-state',
    default: {
        content: '#fff',
        subContent: '#fff',
        color: '#000',
        border: '#eee',
        subColor: '#666'
    }
})


/*useEffect(() => {
    if (theme == 'dark') {
      setThemeStyle({
        content: '#000',
        subContent: '#444',
        color: '#fff',
        border: '#444',
        subColor: '#bbb'
      })
    } else {
      setThemeStyle({
        content: '#fff',
        subContent: '#fff',
        color: '#000',
        border: '#eee',
        subColor: '#666'
      })
    }
  }, [theme])*/

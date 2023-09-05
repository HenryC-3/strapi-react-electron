import {useEffect, useState} from 'react';

// 使用环境变量 BASE_URL 取代当前变量
const baseURL = 'http://127.0.0.1:1337';

const App = () => {
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    fetch(`${baseURL}/api/images?populate=Image`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        const {Note, Image} = data.data[0].attributes;
        setNote(Note);
        setUrl(baseURL + Image.data.attributes.url);
      });
  });

  return (
    <>
      <div>
        <h1>{note}</h1>
        <h4>
          Image URL <a href={url}>{url}</a>
        </h4>
        <img src={url} />
      </div>
    </>
  );
};
export default App;

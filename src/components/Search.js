import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



const Search = () => {

  const [tags, setTags] = useState("");
  const [result, setResult] = useState("");
  const history = useHistory();

  let getTags = async () => {
      axios
      .get('/api/notes/?tags__name=' + tags)
      .then((res) => {
      setResult(res.data)
    })
    history.push("/search/tags=" + tags);
  }
  
  const handleOnChange = (e) => {
    setTags(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getTags()
  };

  return (
    <div><div class="form__group field">
    <form onSubmit={handleSubmit}>
      <input type="input" className="form__field" placeholder="Search by tag..." name="Tag" id='name' onChange={handleOnChange} />
    </form>
    </div>

    </div>
  )
}

export default Search
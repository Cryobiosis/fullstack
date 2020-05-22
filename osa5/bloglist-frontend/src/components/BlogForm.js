import React from 'react'

const BlogForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <label>
          title:
          <input type="text" name="title" /*value={props.name}*/ onChange={props.titleOnChange}/>
        </label>
        <label>
          author:
          <input type="text" name="author" /*value={props.number}*/ onChange={props.authorOnChange}/>
        </label>
        <label> url:
          <input type="text" name="url" /*value={props.number}*/ onChange={props.urlOnChange}/>
        </label>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      )
}

export default BlogForm
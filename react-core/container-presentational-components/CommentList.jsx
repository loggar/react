const CommentList = props =>
	<ul>
		{props.comments.map(c => (
			<li>{c.body}—{c.author}</li>
		))}
	</ul>

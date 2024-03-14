import { useState } from 'react'
import supabase from '../supabase'
import { CATEGORIES } from '../data'
import Button from './shared/Button'
import Message from './shared/Message'
// import uniqid from 'uniqid'

function FactForm({ setShowForm, setFacts}) {
	const [text, setText] = useState('')
	const [source, setSource] = useState('https://example.com/')
	const [category, setCategory] = useState('')
	const [message, setMessage] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const textLength = text.trim().length

	const addFact = newFact => {
		setFacts(facts => [newFact, ...facts])
	}

	const isValidHttpUrl = string => {
		let url
		try {
			url = new URL(string)
		} catch (_) {
			return false
		}
		return url.protocol === 'http:' || url.protocol === 'https:'
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// Check conditions
		if (text === '') {
			setMessage('You must enter text!')
		} else if (textLength > 200) {
			setMessage('Your text must be shorter than or equal 200 characters!')
		} else if (!isValidHttpUrl(source)) {
			setMessage('You enter invalid url!')
		} else if (category === '') {
			setMessage('You must select category!')
		} else {
			// Create new fact
			// const newFact = {
			// 	id: uniqid(),
			// 	text,
			// 	source,
			// 	category: category,
			// 	votesInteresting: 0,
			// 	votesMindblowing: 0,
			// 	votesFalse:0,
			// 	createdIn: new Date().getFullYear(),
			// }
			setIsUploading(true)
			// Insert new row into facts
			const { data, error } = await supabase
				.from('facts')
				.insert([{ text, source, category }])
				.select()
			setIsUploading(false)
			// Add new Fact
			if (!error) {
				addFact(data[0])
			}
			// Reset fields
			setText('')
			setSource('https://example.com/')
			setCategory('')
			// Close form
			setShowForm(false)
		}
	}

	return (
		<div className='form-wrapper'>
			<form
				className='fact-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					value={text}
					placeholder='Udemy is the biggest platform in the world'
					disabled={isUploading}
					onChange={e => setText(e.target.value)}
				/>
				<span>{200 - textLength}</span>
				<input
					type='text'
					value={source}
					placeholder='Trustworthy source'
					disabled={isUploading}
					onChange={e => setSource(e.target.value)}
				/>
				<select
					value={category}
					disabled={isUploading}
					onChange={e => setCategory(e.target.value)}>
					<option value=''>Choose category</option>
					{CATEGORIES.map(category => (
						<option
							key={category.name}
							value={category.name}>
							{category.name.toUpperCase()}
						</option>
					))}
				</select>
				<Button
					className='btn btn-large'
					disabled={isUploading}>
					Add Post
				</Button>
			</form>
			<Message message={message} type='error'/>
		</div>
	)
}
export default FactForm

import { useEffect, useState } from 'react'
import supabase from './supabase'
import Header from './components/Header'
import FactForm from './components/FactForm'
import FactList from './components/FactList'
import CategoryFilter from './components/CategoryFilter'
import Message from './components/shared/Message'

function App() {
	const [facts, setFacts] = useState([])
	const [showForm, setShowForm] = useState(false)
	const [currentCategory, setCurrentCategory] = useState('all')
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	
	useEffect(() => {
		async function getFacts() {
			let query = supabase
				.from('facts')
				.select('*')

			if (currentCategory !== 'all') {
				query = query.eq('category', currentCategory)
			}

			const { data: facts, error } = await query.order('votesInteresting', { ascending: false })
			.limit(1000)

			if (!error) {
				setFacts(facts)
			} else setIsError(true)
			
			setIsLoading(false)
		}
		getFacts()
	}, [currentCategory])

	const toggleForm = () => {
		setShowForm(showForm => !showForm)
	}

		return (
		<>
			<Header
				showForm={showForm}
				handleClick={toggleForm}
			/>
			{showForm && (
				<FactForm
					setFacts={setFacts}
					setShowForm={setShowForm}
				/>
			)}
			<main className={showForm ? 'main main-lower-height' : 'main'}>
				<CategoryFilter
					setCurrentCategory={setCurrentCategory}
				/>
				{isLoading ? (
					<Message message={'Loading...'} />
				) : (isError ? <Message message={'There was a problem getting data'} /> :
					<FactList
						facts={facts}
						setFacts={setFacts}
					/>
				)}
			</main>
		</>
	)
}

export default App

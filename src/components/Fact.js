import supabase from '../supabase'
import { CATEGORIES } from '../data'
import Button from './shared/Button'
import { useState } from 'react'

function Fact({ fact, setFacts }) {
	const [isUpdating, setIsUpdating] = useState(false)
	const isDisputing = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse

	const handleVotes = async columnName => {
		setIsUpdating(true)
		// Update supabase
		const { data: updatedFact, error } = await supabase
			.from('facts')
			.update({ [columnName]: fact[columnName] + 1 })
			.eq('id', fact['id'])
			.select()

		setIsUpdating(false)
		// Update UI
		if (!error) {
			setFacts(facts => facts.map(f => (f.id === fact.id ? updatedFact[0] : f)))
		}
	}
	return (
		<li>
			<article className='fact'>
				<p className='fact-text'>
					{isDisputing && <span className='disputed'>[⛔ DISPUTED]</span>}
					{fact.text}
					<a
						className='fact-source'
						href={fact.source} 						target='_blank'
						rel="noreferrer">
						(Source)
					</a>
				</p>
				<span
					className='fact-category'
					style={{
						backgroundColor: CATEGORIES.find(
							item => fact.category === item.name
						).color,
					}}>
					{fact.category}
				</span>
				<div className='vote-buttons'>
					<Button
						className={'vote-btn interesting-btn'}
						disabled={isUpdating}
						handleClick={() => handleVotes('votesInteresting')}>
						👍 <span>{fact.votesInteresting}</span>
					</Button>
					<Button
						className={'vote-btn mindblowing-btn'}
						disabled={isUpdating}
						handleClick={() => handleVotes('votesMindblowing')}>
						😯 <span>{fact.votesMindblowing}</span>
					</Button>
					<Button
						className={'vote-btn false-btn'}
						disabled={isUpdating}
						handleClick={() => handleVotes('votesFalse')}>
						⛔ <span>{fact.votesFalse}</span>
					</Button>
				</div>
			</article>
		</li>
	)
}
export default Fact

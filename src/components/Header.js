import { BiSolidMessageAltDetail } from "react-icons/bi";
import Button from "./shared/Button";

function Header({showForm, handleClick}) {
	return (
		<header className='header'>
			<div className='logo'>
				<div className='icon-wrapper'>
					<BiSolidMessageAltDetail />
				</div>
				<h3>Facts Blog</h3>
			</div>
			<Button className='btn btn-large' handleClick={handleClick}>{showForm ? 'Close' : 'Share a fact'}</Button>
		</header>
	)
}
export default Header

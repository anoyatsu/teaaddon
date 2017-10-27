let storage = chrome.storage.sync;
let key = 'teegschwendnerFav';

let idPre = 'ratingDiv_';

//own style element for rating classes
let styleEl = document.createElement('style');
document.head.appendChild(styleEl);
let ratingClasses = [
	'.rating1 {opacity: 0.3}',
	'.rating2 {opacity: 0.6}',
	'.rating3 {background-color: #ffffdf}',
	'.rating4 {background-color: #ffffbe}',
	'.rating5 {background-color: #ffff88}'
];

for (let r of ratingClasses) {
	styleEl.innerHTML += r + '\n';
}

//star images
let r0 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAEb0lEQVR42r1XWUicZxQd02pJSNNCEh9KuoDQkDbQBx8CaV7a0oJUqFJ8EvcFdRynjksRLe67VuuGOu401qXuUXHfjbtVrFr3tS5TnagdZ9zm9nw/REyIxn+o/nD4x38799zv3nM/BQINDxsbmw/d3Ny+xk8twWUfEonks5ycnA6RSHTnsrnfzM7OrlhfX3+WmZkpwd9XLo3ZxcXli5mZGZVSqTzq7+9vEIvFdy+L+0pubm6pSqWi/f19QhA7eXl5Tpei3t3d/ZuJiYmlvb09YtjZ2aGWlpZaHx8fvQslNjExuV5UVCTFWu8j5cSwu7tLY2Nju1h7S9x/48LIg4ODv+rr6xvf2toihUJxDLlcTmVlZR2+vr63LoTY1NT0RkFBQcTc3Nze9vY2l+6TgPp9f39/mwshh6qHtbW1f21sbBBT/jI2NzcJfb9gbGysi/TrnPe7Wvb29tpOTk7X4Vi3goKC3o+KivokNjb2UUhIyA+BgYHV0dHR/xYXF9PU1BRHchpQ+VRZWUlpaWmHERERc3j/V5xtExISHoSFhX0KAR+hYHXB946+vr62QCIUfpyYmCjKysr6TSqVLuTn56sbGxtpeHiYZmdnaW1tjWQymUZYWVnhvjEyMkLNzc2EYlWnpKT84+Xl9Tvs+R5rnfu4UDo4OKhcXV2li8Ti4qIaQfwdGRnpAVt+i8u7h4eHXlxcXAnUqpeXl+n/wNLSEs3Pz3NLMTk5ydSrCwsLV0JDQ908PT3ffmHhEckNb2/vJz09PeqFhQXiA0YwOjpKyN4LGBgY4AALpuTkZLmzs7PnseJTqvpxW1ubanp6mluvk2Ak7DorPLaOvb29r0VnZyeh4Hatra1/em3pC4XCm6jMpIaGBvn4+DhHxM5M2dDQECEz1N3dfS40NTURinkNxD+eu6fx8Hvh4eFRaC85Sxkj7Orq4oX6+nqmeBFiRLw3HA4ODroojDDMbWVHRwfxAQYNZWRkyDB6xTCcqxq5GjLwfWpq6lZ7ezvxQWtrK8Ez1mEm32psqXZ2dhK0h4Ip4QtMuSM4ppXGezxELq2oqDhghcMX2HAQZnwAvnGNNzHzXrjfk+rqas5uXwa64Rivug8rJT8/v8dWVla3eZObmZl9gCHzlJGzyn2Ouro6NabbYVVV1R5sWVVSUqLCtQNcU+N8/BwbMHi/i22xeZMj4geYbn+ChPBhDjU1NUcIRpmUlLTp6uo6hI5wZNmJj4+XlZeXK3D/8MSzBL+QYVre04T8OyibZwqYeqz9IdruGSbSH1Bja2BgwNmkoaHhNUtLSxME05Seni7DjuaIBYx3KCYmhmCpX2pS6WL06lZpaSmB9ABbqGGoCLKwsNB7VQWjn2/b2tq6YD60sfZElxCCJ/xzIeLLreXo6BiMtB/A6SaxL/8ZmXj4XO1ZBwsOQboFBAQ0Y4IpMEikvJiNjIzeRYuE48VfsK6fs9TybFFtGNRdWKsQGUzmu0XWMTc3v3kWqYlAoFPgeufqWSbC2pVtPE+7/x85x0FZIYZyeAAAAABJRU5ErkJggg==';
let r1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAFDklEQVR42r2Xe0zTVxTHjwLDFURUYLgRYOJzisCqmOlE8TWZzAmsgOgUCW8p6BSYSNtBfAyICuUlWqlFKaBAC6VSLC20bKMgzKmAa3GabX/MbDHGbMM4wu/s/pjRmeHgR8STfNK0v3vOt7fnnnNPAcZpBWFTfHI5MH+UZZOe8PKMA2B2Mc0zuWzvnOPwqu10lN08vXiXVicOfyAMtfB6ZcIcDpjJv/SJ6ZYlPehtFmA1j6186T/ti6w43NZVczpQ0afhU0ZdJnZWcweLgmH9hAsj2aHs6KqtHVWRA0adAE16AdKv9dmrG7l+YDmh4iXR06ddPrFO0adNI8K8p1ytib1XxnUKnFBxcaLTJkPVbrJrWvwZPer9g1cK/CqEHLCfKO1JdUeW625p9xPBlOcwtiZjR9XOn6sOLQp6+Sec1LUwBAK7ZJGDRl0yEXwe+rOepsShJuG6C8Kt4LYGwHxMgU/ugFklbLDIioCppbut7Sv2urrKee7u8oxFvtJUt/Tyz1y+qs3wGNCfCyAi+4jYyNDPrjfGYWvpVqw7wqbK97v2VhxwLapMmb/9Em/J8sr0xQslqbOdpdFgd3YLTBWsIV9QwnVMVp5cebAhx7tekbXsnrbkg6Eu2S7s1STirZYkEjSJBGcO7Uf792mT8IYqDg2VIagu8MXaDPdfxPGOhUf9YQFIU+Zu0J72a72pihoy6rjEceIwtnKxTfLxT9X8RdsEbGABvX0R18lbfWr9lZtNEZRJvwf72xIYY6LRx/+DLg77NJF4rS4YDeWbsE20CrWF3ijPdP+zIm3h5miS5qd5FwBMFkVMX3yl0EfXp42kbn+TgGPi6z3D3Lgcii1FXqjIcMQ63sxh5OkzUJZmi7UHbfDiASss2WU2IAyx8HhhKz4RCLObhCs6TPoo6gdDPN4x7HkK/b6/LZrkMgJ7VCGoO+WF9fwZWJc+DeWHbEZERqhOsabO7Db7NS8IVox6+nP9wVl53FvXo95B3emMx9vtMdir3oY3lAHYduZdvHzEARsy7UZFkUF2z7MdEsdYmoRB8BFdrmMqv2wOODYeXyptL9841Fnhgy0F87Ap+01UZc0aM8rD9pQkzrI/jwMBz+V4LCaJff2tsoRpIrnAHjV5Low5n2j1MPcT8B+u5/F0NVG4RUzdFw6U/tQcZMqFROv7OZth8bhaqsAfWJJ41heqHGdsF7/DmFq+w8N8DmwZ34AYADPPJ9mU6YrmYZfUkzGaAreB/GA4MC7xrEBwqkqd2dJxwQO/q1nGmI4yj8HiMBCPS5zU5dwa3ht3byrew17lyv9gOO+B6lw3fNHz6zJvSpJgrR5uo0ytKMyC3XDM+S+TZg0+YzXVq1wxpMp2GSyNZjUVf2r++blY1n0NKcXv1T7477W3VO9TNXyHb08GwELmU0u0NaeleAHebdtI2ECZmn2pdsmS38WxrG4ScDt9IOl1ORvBiuQ2pXyf7Y+d5V6P+jW+1B39Brzdsg6bhXNNeYHgy1i8jGvDv1q5lOxiLXZK2X9cOmhnEAZDavaH4DjSYJlN0lS80/xYfabTte6Lyx4bm9dih5T9G/GJYCx+NspKqsmf/7jhmEuXKGpKen4QuX9HGzBJJzuxBZaKIqccVma5djfmvP2oMJS+txiaMHSSojSGxS8MA0/hCGPxk149eSRf7hywLOSAZ0m4eRoZKpMFHLBmVmp+4EQH+b9/LqPNakT0tSdnY8Rr9G8wpUIsba/3dAAAAABJRU5ErkJggg==';


storage.get(key, function (result) {
	let teas = [];
	if (result[key]) {
		teas = result[key];
		console.log(teas);
	}
	markTea(teas);
});

function markTea(teas) {
	//go through all product boxes
	let box = document.getElementsByClassName('product--box box--basic');
	let nr = '';
	let ratingDiv = [];
	for (let i = 0; i < box.length; i++) {
		//get the tea nr
		nr = box[i].getAttribute('data-ordernumber');
		box[i].style.borderBottom = '1px solid #333';

		//create the rating div
		ratingDiv[i] = document.createElement('div');
		ratingDiv[i].id = idPre + nr;
		ratingDiv[i].align = 'center';
		ratingDiv[i].style.postion = 'relative';
		ratingDiv[i].style.width = '100%';
		ratingDiv[i].style.alignContent = 'center';
		box[i].appendChild(ratingDiv[i]);
		generateRating(nr);
	}

	function generateRating(nr) {
		let id = idPre + nr;
		let ratingDiv = document.getElementById(id);
		let container = ratingDiv.parentElement;
		let rating = 0;
		
		//check if the current tea was already rated
		for (let t of teas) {
			if (t.nr === parseInt(nr)) {
				rating = t.rating;
				break;
			}
		}
		
		//set the background-color for the container div
		container.setAttribute('originalRating', rating);
		changeRatingClass(container, rating);
		
		//generate rating star img elements
		let img = [];
		for (let i = 1; i <= 5; i++) {
			img[i] = document.createElement('img');
			img[i].style.cursor = 'pointer';
			img[i].style.display = 'inline-block';
			if (rating >= i) {
				img[i].src = r1;
			} else {
				img[i].src = r0;
			}
			img[i].setAttribute('originalSrc', img[i].src);
			ratingDiv.appendChild(img[i]);
			
			addEvents(nr, img[i], i);
		}
		
	}
	
	function addEvents(nr, el, r) {
		let imgs = el.parentElement.children;
		let container = el.parentElement.parentElement;
		
		//mouseover event, replaces the empty star with the filled star image when hovering over the stars
		el.addEventListener('mouseover', function () {
			for (let i = 0; i < imgs.length; i++) {
				if (i < r) {
					imgs[i].src = r1;
				} else {
					imgs[i].src = r0;
				}
				changeRatingClass(container, r);
			}
		});
		
		//mouseout event, replaces the star images changed by the mouseover event with the original setting
		el.addEventListener('mouseout', function () {
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].src = imgs[i].getAttribute('originalSrc');
				changeRatingClass(container, container.getAttribute('originalRating'));
			}
		});
		
		//click event, sends the info to the separate php script to save
		el.addEventListener('click', function () {
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].setAttribute('originalSrc', imgs[i].src);
			}
			container.setAttribute('originalRating', r);

			//create the object for the current tea
			let obj = {
				nr: nr,
				rating: r
			};
			//add it to the array
			teas.push(obj);

			//and save the whole array
			storage.set({[key]: teas})
		});
	}
	
	function changeRatingClass(div, r) {
		if (!div.getAttribute('originalRating')) {
			div.setAttribute('originalRating', '0');
		}
		
		if (div.className.match(/rating/)) {
			div.className = div.className.replace(/rating[0-5]/, 'rating'+r);
		} else {
			div.className += ' rating'+r;
		}
	}
}
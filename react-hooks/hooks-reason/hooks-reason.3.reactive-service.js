// 5. Keep related logic in the same place
// Complex components become hard to understand

// With the class-based approach, we have different life cycle methods such as componentDidMountand componentDidUpdate etc. Let's consider a situation where subscribing to services A and B in componentDidMount and unsubscribing them on componentWillUnmount. With time, there will be many logics included in both life cycle methods, and it will be hard to keep track of which part of mounting is related in unmounting.
// To demonstrate this, let's create an RxJs based service to get the count. We will use this service to update the count in ShowCount example. Note that we will be removing the handleClickEvent as we no longer need to update the component on click events.

import { Subject } from "rxjs";

export function getCounts() {
  const subject = new Subject();
  let count = 0;
  const interval = setInterval(() => {
    if (count > 10 || subject.isStopped) {
      clearInterval(interval);
      subject.complete();
    }
    subject.next(count++);
  }, 1000);

  return subject;
}

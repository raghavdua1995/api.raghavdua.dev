export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
      // eslint-disable-next-line promise/no-callback-in-promise
      .catch(next);
};

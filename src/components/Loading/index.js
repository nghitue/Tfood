function Loading({ isShow }) {
  const content = <section className="loading-common">
  <div className="loading-common-ins">
      <div className="loader">
          <div className="loader-inner ball-pulse">
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
  </div>
</section>
  return ( isShow && content );
}

export default Loading;
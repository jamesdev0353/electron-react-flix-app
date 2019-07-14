"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Fade = require("react-reveal/Fade");

var _Fade2 = _interopRequireDefault(_Fade);

var _reactLazyLoad = require("react-lazy-load");

var _reactLazyLoad2 = _interopRequireDefault(_reactLazyLoad);

var _pluralize = require("pluralize");

var _pluralize2 = _interopRequireDefault(_pluralize);

var _movieItem = require("./movie-item");

var _movieItem2 = _interopRequireDefault(_movieItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenreContainer = function (_Component) {
    _inherits(GenreContainer, _Component);

    function GenreContainer(props) {
        _classCallCheck(this, GenreContainer);

        var _this = _possibleConstructorReturn(this, (GenreContainer.__proto__ || Object.getPrototypeOf(GenreContainer)).call(this, props));

        _this.openExplore = function () {
            _this.setState({ showExplore: true });
        };

        _this.closeExplore = function () {
            _this.setState({ showExplore: false });
        };

        _this.getExploreName = function () {
            var title = _this.props.genreInfo.activeGenre.toLowerCase();
            var exempt = ["comedy", "drama", "documentary", "thriller", "suggestions", "recents", "favorites"],
                hideMovies = false;

            if (exempt.indexOf(title) > -1) {
                title = (0, _pluralize2.default)(title);
                hideMovies = true;
            } else if (title.indexOf('movies') > -1) {
                hideMovies = true;
            }
            _this.setState({ exploreName: title, hideMovies: hideMovies });
        };

        _this.easingFunction = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        _this.scrollTo = function (to, duration) {
            return new Promise(function (resolve, reject) {
                var start = _this.movieListRef.current.scrollLeft,
                    change = to - start,
                    currentTime = 0,
                    increment = 20;

                var animateScroll = function animateScroll() {
                    currentTime += increment;
                    var val = _this.easingFunction(currentTime, start, change, duration);
                    _this.movieListRef.current.scrollLeft = val;
                    if (currentTime < duration) {
                        setTimeout(animateScroll, increment);
                    } else if (currentTime >= duration) {
                        resolve();
                    }
                };

                animateScroll();
            });
        };

        _this.scrollMovieGenre = function (left) {
            var n = _this.props.genreInfo.movies.length;

            var container = _this.movieListRef.current,
                scrollVal = container.scrollLeft;

            var viewportW = container.offsetWidth - 50,
                boxW = _this.itemWidth,
                viewItems = Math.ceil(viewportW / boxW) - 1,
                containerScrollWidth = boxW * n - viewportW - 30;

            if (left) {
                scrollVal -= boxW * viewItems;
                scrollVal += 15;
            } else {
                scrollVal += boxW * viewItems;
                scrollVal -= 15;
            }

            if (scrollVal > containerScrollWidth - 30 && scrollVal < containerScrollWidth) {
                scrollVal = containerScrollWidth;
            }

            _this.scrollTo(scrollVal, 450).then(function () {
                if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
                    _this.setState({ movieScrollRight: false });
                    _this.setState({ movieScrollLeft: true });
                } else if (container.scrollLeft === 0) {
                    _this.setState({ movieScrollRight: true });
                    _this.setState({ movieScrollLeft: false });
                } else {
                    _this.setState({ movieScrollRight: true });
                    _this.setState({ movieScrollLeft: true });
                }
            });
        };

        _this.scrollLeft = function () {
            _this.scrollMovieGenre(true);
        };

        _this.scrollRight = function () {
            _this.scrollMovieGenre();
        };

        _this.handleResize = function () {
            if (_this.movieListRef.current) {
                if (_this.props.genreInfo.movies) {
                    if (_this.props.genreInfo.movies.length * _this.itemWidth > _this.movieListRef.current.offsetWidth) {
                        _this.setState({ showArrows: true });

                        if (_this.movieListRef.current.scrollLeft + _this.movieListRef.current.offsetWidth < _this.movieListRef.current.scrollWidth - 10) {
                            _this.setState({ movieScrollRight: true });
                        } else {
                            _this.setState({ movieScrollRight: false });
                        }
                    } else {
                        _this.setState({ showArrows: false });
                    }
                }
            }
        };

        _this.setItemWidth = function () {
            _this.itemWidth = _this.props.shows ? 340 : 230;
        };

        _this.handleOpenGenre = function () {
            _this.props.toggleGenre(true, _this.props.genreInfo);
        };

        _this.movieListRef = _react2.default.createRef();

        _this.state = {
            exploreName: '',
            hideMovies: false,
            showArrows: false,
            showExplore: false,
            movieScrollLeft: false,
            movieScrollRight: false
        };
        return _this;
    }

    _createClass(GenreContainer, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.state.showArrows === nextState.showArrows && this.props.genreInfo === this.props.genreInfo && this.state.movieScrollLeft === nextState.movieScrollLeft && this.state.movieScrollRight === nextState.movieScrollRight && nextState.showExplore === this.state.showExplore && nextState.exploreName === this.state.exploreName && nextState.hideMovies === this.state.hideMovies) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.handleResize();
            this.getExploreName();
            this.setItemWidth();
            window.addEventListener("resize", this.handleResize);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var movies = this.props.genreInfo.movies.slice(0, 20).map(function (movie, index) {
                return _react2.default.createElement(_movieItem2.default, {
                    shows: _this2.props.shows,
                    movie: movie,
                    openBox: _this2.props.openBox,
                    key: movie.title + index + 'genre' });
            });
            var n = this.props.shows ? 340 : this.props.genreInfo.movies.length ? 470 : 100;

            return _react2.default.createElement(
                _reactLazyLoad2.default,
                {
                    height: n,
                    offsetVertical: n,
                    debounce: false,
                    onContentVisible: this.handleResize },
                _react2.default.createElement(
                    _Fade2.default,
                    { distance: "20%", bottom: true },
                    _react2.default.createElement(
                        "div",
                        {
                            className: "genre-container",
                            style: {
                                width: "calc(100% + " + (this.state.movieScrollLeft ? '40px' : '20px') + ")"
                            } },
                        _react2.default.createElement(
                            "div",
                            {
                                className: "movie-genre",
                                onClick: this.handleOpenGenre,
                                onMouseEnter: this.openExplore,
                                onMouseLeave: this.closeExplore },
                            _react2.default.createElement(
                                "span",
                                null,
                                this.props.genreInfo.activeGenre
                            ),
                            _react2.default.createElement(
                                _Fade2.default,
                                {
                                    mountOnEnter: true,
                                    unmountOnExit: true,
                                    duration: 450,
                                    when: this.state.showExplore,
                                    distance: "5%",
                                    left: true },
                                _react2.default.createElement(
                                    "div",
                                    { className: "genre-explore" },
                                    _react2.default.createElement(
                                        "div",
                                        null,
                                        "Explore all " + this.state.exploreName + " " + (this.state.hideMovies ? '' : this.props.shows ? 'shows' : 'movies')
                                    ),
                                    _react2.default.createElement("i", { className: "mdi mdi-black mdi-arrow-right" })
                                )
                            )
                        ),
                        this.state.showArrows ? _react2.default.createElement(
                            "div",
                            { className: "movie-scroll-container", style: { height: n - 100 } },
                            _react2.default.createElement(
                                _Fade2.default,
                                { duration: 350, when: this.state.movieScrollLeft, distance: "10%", left: true },
                                _react2.default.createElement(
                                    "div",
                                    { className: "movie-scroll movie-scroll-left", onClick: this.scrollLeft },
                                    _react2.default.createElement("i", { className: "mdi mdi-light mdi-24px mdi-chevron-left" })
                                )
                            ),
                            _react2.default.createElement(
                                _Fade2.default,
                                { duration: 350, when: this.state.movieScrollRight, distance: "10%", right: true },
                                _react2.default.createElement(
                                    "div",
                                    { className: "movie-scroll movie-scroll-right", onClick: this.scrollRight },
                                    _react2.default.createElement("i", { className: "mdi mdi-light mdi-24px mdi-chevron-right" })
                                )
                            )
                        ) : '',
                        this.props.genreInfo.movies ? this.props.genreInfo.movies.length ? _react2.default.createElement(
                            "div",
                            { className: "movie-list-paginated", ref: this.movieListRef },
                            movies
                        ) : "" : ""
                    )
                )
            );
        }
    }]);

    return GenreContainer;
}(_react.Component);

exports.default = GenreContainer;
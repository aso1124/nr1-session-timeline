import React from 'react'
import { Grid, GridItem, HeadingText } from 'nr1'
import startCase from 'lodash.startcase'
import SearchBarContainer from '../../src/components/search-bar/SearchBarContainer'
import SearchResults from '../../src/components/search-results/SearchResults'
import TimelineContainer from '../../src/components/timeline/TimelineContainer'
import config from '../../src/config/config'
import { formatSinceAndCompare } from '../../src/components/utils/nrql-formatter'

export default class SessionTimelineContainer extends React.PureComponent {
  state = {
    filter: '',
    session: '',
    sessionDate: '',
  }

  onSelectFilter = filter => {
    this.setState({ filter })
  }

  onClearFilter = () => {
    this.setState({ filter: '', session: '', sessionDate: '' })
  }

  onChooseSession = (sessionDate, session) => {
    this.setState({ sessionDate, session })
  }

  render() {
    const {
      entity,
      launcherUrlState: { timeRange },
    } = this.props
    const { filter, session, sessionDate } = this.state
    const { searchAttribute } = config
    const duration = formatSinceAndCompare(timeRange)

    return (
      <Grid className="container__grid-template">
        <GridItem className="timeline-grid-item" columnStart={1} columnEnd={12}>
          <SearchBarContainer
            entity={entity}
            duration={duration}
            selectFilter={this.onSelectFilter}
            clearFilter={this.onClearFilter}
          />
        </GridItem>

        {filter && (
          <React.Fragment>
            <GridItem
              className="timeline-grid-item"
              columnStart={1}
              columnSpan={4}
              collapseGapAfter
            >
              <SearchResults
                entity={entity}
                selected={filter}
                duration={duration}
                chooseSession={this.onChooseSession}
              />
            </GridItem>
            <GridItem className="timeline-grid-item" columnSpan={8}>
              <TimelineContainer
                entity={entity}
                filter={filter}
                session={session}
                sessionDate={sessionDate}
                duration={duration}
              />
            </GridItem>
          </React.Fragment>
        )}

        {!filter && (
          <GridItem
            className="timeline-grid-item"
            columnStart={1}
            columnSpan={12}
          >
            <div className="empty-state">
              <HeadingText
                className="empty-state-header"
                type={HeadingText.TYPE.HEADING_3}
              >
                Search for a {startCase(searchAttribute)} to start
              </HeadingText>
              <div className="empty-state-desc">
                To get started, please search for and select an item in the
                search bar above
              </div>
            </div>
          </GridItem>
        )}
      </Grid>
    )
  }
}

import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { css } from 'emotion'
import React from 'react'
import { useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import { logos } from '../../../config/logos'
import { hideWindow, selectApp } from '../../sendToMain'
import { AppThunk } from '../../store'
import { ExtendedApp, useTheme } from '../../store/selector-hooks'
import { themes } from '../../themes'
import Kbd from '../atoms/kbd'

const clickedTileButton = (
  appId: string,
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): AppThunk => (_, getState) => {
  selectApp({
    url: getState().ui.url,
    appId,
    isAlt: event.altKey,
    isShift: event.shiftKey,
  })
  hideWindow()
}

interface Props {
  app: ExtendedApp
  isFav?: boolean
  className?: string
}

const Tile: React.FC<Props> = ({ app, isFav, className }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  return (
    <button
      key={app.id}
      aria-label={`${app.name} Tile`}
      className={clsx(
        'w-32 h-32 p-8',
        'flex flex-col items-center justify-center max-h-full',
        'rounded',
        'focus:outline-none',
        css({
          color: themes[theme].tile.text,
        }),
        className,
      )}
      data-for={app.id}
      data-tip
      onClick={(event) => dispatch(clickedTileButton(app.id, event))}
      type="button"
    >
      <img
        alt={app.name}
        className="w-full object-contain"
        src={logos[app.id]}
      />
      <Kbd className="flex-shrink-0 flex justify-center items-center mt-2">
        {isFav && (
          <FontAwesomeIcon
            aria-label="Favourite"
            className={clsx('mr-2', css({ color: themes[theme].icons.star }))}
            icon={faStar}
            role="img"
          />
        )}
        {/* Prevents box collapse when hotkey not set */}
        {app.hotkey || <span className="opacity-0">.</span>}
      </Kbd>
      <ReactTooltip
        backgroundColor={themes[theme].tooltip.bg}
        effect="solid"
        id={app.id}
        offset={{ top: 24 }}
        place="bottom"
        textColor={themes[theme].tooltip.text}
      >
        {app.name}
      </ReactTooltip>
    </button>
  )
}

export default Tile

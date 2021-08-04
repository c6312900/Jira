import { Component, PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: {error:Error | null}) => ReactElement

//https://github.com/bvaughn/react-error-boundary
// export class ErrorBoundary extends Component<{children:ReactNode, fallbackRender: FallbackRender}, any> {
export class ErrorBoundary extends Component<PropsWithChildren<{fallbackRender: FallbackRender}>, {error:Error | null}> {
    state = {error: null}
    
    //當子組件拋出異常,這裡會接受到並且調用
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render() {
       const {error} = this.state 
       const {fallbackRender,children} = this.props
       if (error) {
         return fallbackRender({error})
       }
       return children
    }
}
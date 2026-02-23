import React from "react";

import { attachAuthListener } from "../utils/firebase";

export const authStates = {
    INITIAL_VALUE: "unknown",
    LOGGED_IN: "logged_in",
    LOGGED_OUT: "logged_out",
};

export function withAuth(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: undefined,
                authState: authStates.INITIAL_VALUE,
            };

            // initialize() usunięte - Firebase inicjalizuje się automatycznie przy imporcie
            this.unsubscribe = attachAuthListener((user) => {
                this.setState({
                    user: user,
                    authState: user ? authStates.LOGGED_IN : authStates.LOGGED_OUT,
                });
            });
        }

        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }

        render() {
            return (
                <WrappedComponent
                    authState={this.state.authState}
                    user={this.state.user}
                    {...this.props}
                />
            );
        }
    };
}